'use client';
import { useState } from 'react';
import { PUTextInput } from '@/components/ui/PUTextInput';
import { PUButton } from '@/components/ui/PUButton';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PropsTable } from '@/components/docs/PropsTable';
import { PlatformCodeBlock } from '@/components/docs/PlatformCodeBlock';

// ── Phone frame demo ─────────────────────────────────────────

// Figma source: 393×852px. Phone frame inner screen: 300×560px.
function PhoneInputDemo({ dark }: { dark: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const screenBg = dark ? '#011638' : '#ffffff';
  const titleColor = dark ? '#ffffff' : '#000000';
  const subtitleColor = dark ? 'rgba(255,255,255,0.50)' : '#595959';

  return (
    <div style={{ position: 'absolute', inset: 0, background: screenBg, transition: 'background 0.2s ease' }}>

      {/* Title */}
      <p style={{
        position: 'absolute',
        top: 90,
        left: 24,
        fontFamily: 'Poppins, sans-serif',
        fontSize: 18,
        fontWeight: 700,
        color: titleColor,
        lineHeight: 1.3,
        margin: 0,
      }}>
        Sign in
      </p>
      <p style={{
        position: 'absolute',
        top: 117,
        left: 24,
        fontFamily: 'Poppins, sans-serif',
        fontSize: 11,
        fontWeight: 400,
        color: subtitleColor,
        margin: 0,
        lineHeight: 1.5,
      }}>
        Welcome back to Purple
      </p>

      {/* Input 1 */}
      <div style={{ position: 'absolute', top: 196, left: 16, right: 16 }}>
        <PUTextInput
          label="Email address"
          value={email}
          onChange={setEmail}
          type="email"
          dark={dark}
          labelBg={screenBg}
        />
      </div>

      {/* Input 2 */}
      <div style={{ position: 'absolute', top: 280, left: 16, right: 16 }}>
        <PUTextInput
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          dark={dark}
          labelBg={screenBg}
        />
      </div>

      {/* Continue */}
      <div style={{ position: 'absolute', bottom: 118, left: 18, right: 18 }}>
        <PUButton label="Continue" fullWidth />
      </div>

      {/* Create account — 60px from bottom */}
      <div style={{ position: 'absolute', bottom: 60, left: 18, right: 18 }}>
        <button style={{
          width: '100%',
          height: 48,
          borderRadius: 50,
          border: dark ? '1.5px solid rgba(255,255,255,0.40)' : '1.5px solid #CDCED0',
          background: 'transparent',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 13,
          fontWeight: 700,
          color: dark ? '#ffffff' : '#000000',
          cursor: 'pointer',
        }}>
          Create account
        </button>
      </div>

    </div>
  );
}

// ── Props ────────────────────────────────────────────────────

const props = [
  { name: 'label',    type: 'string',                                        required: true,   description: 'Floating label text' },
  { name: 'value',    type: 'string',                                        required: true,   description: 'Controlled input value' },
  { name: 'onChange', type: '(value: string) => void',                       required: true,   description: 'Value change handler' },
  { name: 'type',     type: 'text | email | password | tel | number | url',  default: 'text',  description: 'Input type. password enables the built-in show/hide toggle.' },
  { name: 'error',    type: 'string',                                        default: '—',     description: 'Error message shown beneath the field. Also colours the border and label red.' },
  { name: 'disabled', type: 'boolean',                                       default: 'false', description: 'Disables the field and reduces opacity to 40%.' },
  { name: 'dark',     type: 'boolean',                                       default: 'false', description: 'Dark surface variant — inverts border, label, and text colours.' },
  { name: 'labelBg',  type: 'string',                                        default: 'auto',  description: 'Background colour of the surface this input sits on. Used to mask the border behind the floating label. Defaults to white (light) or #011638 (dark).' },
  { name: 'id',       type: 'string',                                        default: 'auto',  description: 'id for the input element. Auto-generated if omitted.' },
];

// ── Platform code ────────────────────────────────────────────

const swiftCode = `// Basic text field
PUTextInput(
    label: "Email address",
    text: $email
)

// Password — show/hide toggle built in
PUTextInput(
    label: "Password",
    text: $password,
    type: .password
)

// Dark surface
PUTextInput(
    label: "Email address",
    text: $email,
    dark: true
)

// Validation error
PUTextInput(
    label: "Email address",
    text: $email,
    error: "Enter a valid email address"
)

// Disabled
PUTextInput(
    label: "Email address",
    text: $email,
    disabled: true
)`;

const kotlinCode = `// Basic text field
PUTextInput(
    label = "Email address",
    value = email,
    onValueChange = { email = it }
)

// Password — show/hide toggle built in
PUTextInput(
    label = "Password",
    value = password,
    onValueChange = { password = it },
    type = PUTextInputType.Password
)

// Dark surface
PUTextInput(
    label = "Email address",
    value = email,
    onValueChange = { email = it },
    dark = true
)

// Validation error
PUTextInput(
    label = "Email address",
    value = email,
    onValueChange = { email = it },
    error = "Enter a valid email address"
)

// Disabled
PUTextInput(
    label = "Email address",
    value = email,
    onValueChange = { email = it },
    disabled = true
)`;

// ── Page ─────────────────────────────────────────────────────

export default function TextInputPage() {
  const [isDark, setIsDark] = useState(false);

  const [emailA, setEmailA] = useState('');
  const [emailFilled] = useState('hello@purple.ai');
  const [emailError, setEmailError] = useState('not-an-email');
  const [passwordA, setPasswordA] = useState('');
  const [passwordFilled] = useState('supersecret');
  const [darkEmail, setDarkEmail] = useState('');
  const [darkPassword, setDarkPassword] = useState('');

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Input</h1>
      <p className="text-gray-500 mb-8">
        Single-line input with a floating label. Label rests inside the field when empty and
        animates to the top border on focus or when a value is present. Supports all standard
        HTML input types — password gets a built-in show/hide toggle.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame
          label="Sign-in form — light and dark"
          dark={isDark}
          onToggle={() => setIsDark(d => !d)}
        >
          <PhoneInputDemo dark={isDark} />
        </PhoneFrame>
      </div>

      {/* ── States ── */}
      <h2 className="text-lg font-bold text-primary mb-5">States</h2>

      <ComponentPreview label="Default — empty, unfocused">
        <div className="w-[340px]">
          <PUTextInput label="Email address" value={emailA} onChange={setEmailA} type="email" />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Filled — has value, unfocused">
        <div className="w-[340px]">
          <PUTextInput label="Email address" value={emailFilled} onChange={() => {}} type="email" />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Error">
        <div className="w-[340px]">
          <PUTextInput
            label="Email address"
            value={emailError}
            onChange={setEmailError}
            type="email"
            error="Enter a valid email address"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Disabled">
        <div className="w-[340px]">
          <PUTextInput label="Email address" value="" onChange={() => {}} disabled />
        </div>
      </ComponentPreview>

      {/* ── Password ── */}
      <h2 className="text-lg font-bold text-primary mt-10 mb-5">Password</h2>

      <ComponentPreview label="Password — filled, hidden">
        <div className="w-[340px]">
          <PUTextInput label="Password" value={passwordFilled} onChange={() => {}} type="password" />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Password — empty">
        <div className="w-[340px]">
          <PUTextInput label="Password" value={passwordA} onChange={setPasswordA} type="password" />
        </div>
      </ComponentPreview>

      {/* ── Dark ── */}
      <h2 className="text-lg font-bold text-primary mt-10 mb-5">Dark</h2>

      <ComponentPreview label="Dark — empty" bg="dark">
        <div className="w-[340px]">
          <PUTextInput label="Email address" value={darkEmail} onChange={setDarkEmail} type="email" dark labelBg="#011638" />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark — filled" bg="dark">
        <div className="w-[340px]">
          <PUTextInput label="Email address" value="hello@purple.ai" onChange={() => {}} type="email" dark labelBg="#011638" />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark — password" bg="dark">
        <div className="w-[340px]">
          <PUTextInput label="Password" value={darkPassword} onChange={setDarkPassword} type="password" dark labelBg="#011638" />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark — error" bg="dark">
        <div className="w-[340px]">
          <PUTextInput label="Email address" value="not-an-email" onChange={() => {}} type="email" dark labelBg="#011638" error="Enter a valid email address" />
        </div>
      </ComponentPreview>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Props</h2>
      <PropsTable props={props} />

      <PlatformCodeBlock swift={swiftCode} kotlin={kotlinCode} title="PUTextInput" />
    </div>
  );
}
