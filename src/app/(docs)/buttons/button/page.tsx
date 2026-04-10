'use client';
import { useState } from 'react';
import { PUButton } from '@/components/ui/PUButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { PlatformCodeBlock } from '@/components/docs/PlatformCodeBlock';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const swiftCode = `// Variants
PUButton("Get Started", variant: .primary) { }
PUButton("Learn More",  variant: .secondary) { }
PUButton("Go Back",     variant: .secondaryDark) { }
PUButton("Delete",      variant: .destructive) { }

// Sizes
PUButton("Small",  variant: .primary, size: .sm) { }
PUButton("Medium", variant: .primary, size: .md) { }   // default
PUButton("Large",  variant: .primary, size: .lg) { }

// With icon
PUButton("Connect",
    variant: .primary,
    icon: FA.wifi,
    iconPosition: .before) { }

// Loading state — disables tap automatically
PUButton("Saving…", variant: .primary, loading: true) { }

// Full width — stretches to container
PUButton("Get Started", variant: .primary, fullWidth: true) { }`;

const kotlinCode = `// Variants
PUButton(title = "Get Started", onClick = { })
PUButton(title = "Learn More",  variant = PUButtonVariant.Secondary,    onClick = { })
PUButton(title = "Go Back",     variant = PUButtonVariant.SecondaryDark, onClick = { })
PUButton(title = "Delete",      variant = PUButtonVariant.Destructive,  onClick = { })

// Sizes
PUButton(title = "Small",  size = PUButtonSize.Sm, onClick = { })
PUButton(title = "Medium", size = PUButtonSize.Md, onClick = { })  // default
PUButton(title = "Large",  size = PUButtonSize.Lg, onClick = { })

// With icon
PUButton(
    title = "Connect",
    leadingIcon = FA.wifi,
    onClick = { }
)

// Loading state
PUButton(title = "Saving…", isLoading = true, onClick = { })

// Full width
PUButton(
    title = "Get Started",
    modifier = Modifier.fillMaxWidth(),
    onClick = { }
)`;

const props = [
  { name: 'label',        type: 'String',               required: true,       description: 'Button text label' },
  { name: 'variant',      type: 'PUButtonVariant',      default: '.primary',  description: 'primary | secondary | secondary-dark | destructive' },
  { name: 'size',         type: 'PUButtonSize',         default: '.md',       description: 'sm (40pt) | md (48pt) | lg (56pt)' },
  { name: 'icon',         type: 'IconDefinition?',      default: 'nil',       description: 'Optional FA icon shown before or after label' },
  { name: 'iconPosition', type: 'PUButtonIconPosition', default: '.after',    description: 'before | after' },
  { name: 'loading',      type: 'Bool',                 default: 'false',     description: 'Shows spinner and disables interaction' },
  { name: 'fullWidth',    type: 'Bool',                 default: 'false',     description: 'Expands to fill available width' },
  { name: 'action',       type: '() -> Void',           required: true,       description: 'Closure called on tap' },
];

export default function ButtonPage() {
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Button</h1>
      <p className="text-gray-500 mb-8">
        Branded button styles to trigger actions in the user interface. All buttons use a pill shape, Poppins Bold 14px, and the Bottom A shadow.
      </p>

      {/* In Context */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Primary & secondary CTAs" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <div className="flex flex-col h-full">
            <div className="flex-1" />
            <div className="flex flex-col gap-3 p-6">
              <PUButton label="Get Started" variant="primary" fullWidth />
              <PUButton label="Learn More" variant={isDark ? 'secondary-dark' : 'secondary'} fullWidth />
            </div>
          </div>
        </PhoneFrame>
      </div>

      <h2 className="text-lg font-bold text-primary mb-3">Primary</h2>
      <ComponentPreview label="Default">
        <PUButton label="Button" variant="primary" />
      </ComponentPreview>
      <ComponentPreview label="Icon after">
        <PUButton label="Button" variant="primary" icon={faArrowRight} iconPosition="after" />
      </ComponentPreview>
      <ComponentPreview label="Icon before">
        <PUButton label="Button" variant="primary" icon={faArrowRight} iconPosition="before" />
      </ComponentPreview>
      <ComponentPreview label="Loading">
        <PUButton label="Button" variant="primary" loading={loading} onClick={simulateLoad} />
      </ComponentPreview>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Secondary (Light)</h2>
      <ComponentPreview label="Default">
        <PUButton label="Button" variant="secondary" />
      </ComponentPreview>
      <ComponentPreview label="Icon after">
        <PUButton label="Button" variant="secondary" icon={faArrowRight} iconPosition="after" />
      </ComponentPreview>
      <ComponentPreview label="Icon before">
        <PUButton label="Button" variant="secondary" icon={faArrowRight} iconPosition="before" />
      </ComponentPreview>
      <ComponentPreview label="Loading">
        <PUButton label="Button" variant="secondary" loading />
      </ComponentPreview>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Secondary (Dark)</h2>
      <ComponentPreview label="Default" bg="dark">
        <PUButton label="Button" variant="secondary-dark" />
      </ComponentPreview>
      <ComponentPreview label="Icon after" bg="dark">
        <PUButton label="Button" variant="secondary-dark" icon={faArrowRight} iconPosition="after" />
      </ComponentPreview>
      <ComponentPreview label="Icon before" bg="dark">
        <PUButton label="Button" variant="secondary-dark" icon={faArrowRight} iconPosition="before" />
      </ComponentPreview>
      <ComponentPreview label="Loading" bg="dark">
        <PUButton label="Button" variant="secondary-dark" loading />
      </ComponentPreview>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Sizes</h2>
      <ComponentPreview label="sm / md / lg">
        <PUButton label="Small" size="sm" />
        <PUButton label="Medium" size="md" />
        <PUButton label="Large" size="lg" />
      </ComponentPreview>

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      <PlatformCodeBlock swift={swiftCode} kotlin={kotlinCode} title="PUButton" />
    </div>
  );
}
