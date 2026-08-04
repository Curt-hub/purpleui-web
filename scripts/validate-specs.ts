/**
 * Validates every machine-readable spec/token file in the repo against its
 * JSON Schema, plus a handful of cross-file consistency checks that plain
 * JSON Schema can't express on its own (e.g. "every file on disk is
 * registered in index.json and vice versa", "every declared platform has a
 * matching implementation entry and vice versa", "every sourceFile/docPage
 * actually resolves to a real file").
 *
 * This is the mechanical check that replaces manually auditing specs/ by
 * hand - it exists to catch spec drift (missing fields, bad shapes, stale
 * registrations, dead links) automatically instead of via a one-off audit.
 * Every consistency check below is symmetric (checked in both directions)
 * on purpose - an earlier version of this script only checked one direction
 * of two of them, which let an empty `implementation: {}` on a 3-platform
 * spec and a bogus `foundations[]` entry both pass silently. See
 * CHANGELOG.md for how that was found and fixed.
 *
 * Usage:
 *   npm run validate-specs
 *
 * Exit code 0 = everything valid. Exit code 1 = at least one failure
 * (details printed to stderr).
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

const root = resolve(__dirname, '..');
const specsDir = resolve(root, 'specs');
const schemaDir = resolve(specsDir, 'schema');
const docsDir = resolve(root, 'src/app/(docs)');

function readJson(path: string): any {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

// strict: false - the schemas below deliberately use if/then blocks keyed off
// sibling properties (e.g. variants.kind driving which of propName/
// derivedFromProps is required); Ajv's strict mode flags that pattern even
// though it's valid JSON Schema, so strict mode is turned off rather than
// contorting the schema to please it.
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const componentSchema = readJson(resolve(schemaDir, 'component.schema.json'));
const indexSchema = readJson(resolve(schemaDir, 'index.schema.json'));
const tokensSchema = readJson(resolve(schemaDir, 'tokens.schema.json'));
const foundationSchema = readJson(resolve(schemaDir, 'foundation.schema.json'));

const validateComponent = ajv.compile(componentSchema);
const validateIndex = ajv.compile(indexSchema);
const validateTokens = ajv.compile(tokensSchema);
const validateFoundation = ajv.compile(foundationSchema);

let failures = 0;
let checked = 0;

function report(label: string, ok: boolean, errors?: any) {
  checked++;
  if (ok) {
    console.log(`  ✓ ${label}`);
  } else {
    failures++;
    console.error(`  ✗ ${label}`);
    if (errors) {
      for (const err of errors) {
        console.error(`      ${err.instancePath || '(root)'} ${err.message}`);
      }
    }
  }
}

/** docPage "/foundation/colors" -> src/app/(docs)/foundation/colors/page.tsx */
function docPageExists(docPage: string): boolean {
  return existsSync(resolve(docsDir, `.${docPage}`, 'page.tsx'));
}

// ─── tokens.json ────────────────────────────────────────────────────────────

console.log('\ntokens.json');
const tokens = readJson(resolve(root, 'tokens.json'));
report('tokens.json matches tokens.schema.json', validateTokens(tokens), validateTokens.errors);

// ─── specs/index.json ───────────────────────────────────────────────────────

console.log('\nspecs/index.json');
const index = readJson(resolve(specsDir, 'index.json'));
report('index.json matches index.schema.json', validateIndex(index), validateIndex.errors);

// ─── specs/foundation-*.json ────────────────────────────────────────────────

console.log('\nfoundations');
const allSpecFiles = readdirSync(specsDir).filter(f => f.endsWith('.json'));
const foundationFiles = allSpecFiles.filter(f => f.startsWith('foundation-'));
for (const file of foundationFiles) {
  const spec = readJson(resolve(specsDir, file));
  const valid = validateFoundation(spec);
  report(`${file} matches foundation.schema.json`, valid, validateFoundation.errors);

  const specAny: any = spec;
  if (valid && specAny.docPage != null) {
    report(
      `${file}: docPage "${specAny.docPage}" resolves to a real page on disk`,
      docPageExists(specAny.docPage)
    );
  }
}

// ─── specs/PU*.json (component specs) ───────────────────────────────────────

console.log('\ncomponent specs');
const componentFiles = allSpecFiles.filter(f => f.startsWith('PU'));
const componentSpecsByFile = new Map<string, any>();
for (const file of componentFiles) {
  const spec = readJson(resolve(specsDir, file));
  componentSpecsByFile.set(file, spec);
  const valid = validateComponent(spec);
  report(`${file} matches component.schema.json`, valid, validateComponent.errors);

  // (Cast through a fresh `any`-typed binding - Ajv's ValidateFunction is a type
  // predicate defaulting to `data is unknown`, and TS's aliased-condition
  // narrowing turns the still-`any`-typed `spec` into `unknown` inside this
  // block if referenced directly, since `valid` came from calling it on `spec`.)
  const specAny: any = spec;
  if (!valid) continue;

  // Business rule ajv can't express: `implementation` keys and `platforms` must
  // be the exact same set, checked in both directions. A subset check alone
  // (implementation keys ⊆ platforms) lets a spec declare N platforms and
  // document zero of them, since {} is a subset of anything - that's the bug
  // this symmetric version closes.
  const platforms: string[] = specAny.platforms ?? [];
  const implKeys = Object.keys(specAny.implementation ?? {});
  const undocumentedPlatforms = platforms.filter(p => !implKeys.includes(p));
  const orphanedImplKeys = implKeys.filter(k => !platforms.includes(k));
  report(
    `${file}: every declared platform has an implementation entry (${JSON.stringify(platforms)})`,
    undocumentedPlatforms.length === 0,
    undocumentedPlatforms.length
      ? [{ message: `platforms with no implementation entry: ${undocumentedPlatforms.join(', ')}` }]
      : undefined
  );
  report(
    `${file}: every implementation entry is a declared platform (${JSON.stringify(implKeys)})`,
    orphanedImplKeys.length === 0,
    orphanedImplKeys.length
      ? [{ message: `implementation has keys not in platforms: ${orphanedImplKeys.join(', ')}` }]
      : undefined
  );

  // Every non-null sourceFile must resolve to a real file on disk.
  for (const platform of implKeys) {
    const entry = specAny.implementation[platform];
    if (entry?.sourceFile != null) {
      report(
        `${file}: implementation.${platform}.sourceFile "${entry.sourceFile}" exists on disk`,
        existsSync(resolve(root, entry.sourceFile))
      );
    }
  }

  // Every non-null docPage must resolve to a real page on disk.
  if (specAny.docPage != null) {
    report(
      `${file}: docPage "${specAny.docPage}" resolves to a real page on disk`,
      docPageExists(specAny.docPage)
    );
  }
}

// ─── cross-file consistency: every spec file <-> index.json registration ───

console.log('\nregistry consistency (specs/index.json vs disk)');

const registeredSpecPaths = new Set(
  (index.components as any[]).map(c => basename(c.spec as string))
);

// Every component spec file on disk should be referenced by at least one
// index.json entry (PUPassCard.json is deliberately referenced twice - by
// PUPassCard and PUWalletStack - so this is "at least one", not "exactly one").
for (const file of componentFiles) {
  report(
    `${file} is registered in index.json components[]`,
    registeredSpecPaths.has(file)
  );
}

// Every spec path index.json points at should actually exist on disk.
for (const entry of index.components as any[]) {
  const file = basename(entry.spec as string);
  report(
    `index.json entry "${entry.name}" -> specs/${file} exists on disk`,
    componentFiles.includes(file)
  );
  if (entry.docPage != null) {
    report(
      `index.json entry "${entry.name}": docPage "${entry.docPage}" resolves to a real page on disk`,
      docPageExists(entry.docPage)
    );
  }
}

// Foundations: checked in both directions. The first version of this script
// only checked disk -> index.json (every file on disk is registered); it
// never checked the reverse, so a bogus foundations[] entry pointing at a
// file that doesn't exist passed silently. Both directions are checked now.
const registeredFoundationPaths = new Set(
  (index.foundations as any[]).map(f => basename(f.spec as string))
);
for (const file of foundationFiles) {
  report(
    `${file} is registered in index.json foundations[]`,
    registeredFoundationPaths.has(file)
  );
}
for (const entry of index.foundations as any[]) {
  const file = basename(entry.spec as string);
  report(
    `index.json foundations[] entry "${entry.name}" -> specs/${file} exists on disk`,
    foundationFiles.includes(file)
  );
  if (entry.docPage != null) {
    report(
      `index.json foundations[] entry "${entry.name}": docPage "${entry.docPage}" resolves to a real page on disk`,
      docPageExists(entry.docPage)
    );
  }
}

// ─── summary ─────────────────────────────────────────────────────────────

console.log(`\n${checked - failures}/${checked} checks passed.`);
if (failures > 0) {
  console.error(`\n${failures} check(s) failed.\n`);
  process.exit(1);
} else {
  console.log('\nAll specs valid.\n');
}
