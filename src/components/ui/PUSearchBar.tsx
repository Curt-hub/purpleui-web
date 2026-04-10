'use client';

interface PUSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  dark?: boolean;
}

export function PUSearchBar({
  value,
  onChange,
  placeholder = 'Search',
  onFilterPress,
  dark = false,
}: PUSearchBarProps) {
  return (
    <div
      style={{
        height: 48,
        borderRadius: 50,
        background: dark ? '#0a2048' : '#ffffff',           // backgroundElevated dark : background
        boxShadow: dark ? 'none' : '0px 2px 15px rgba(0,0,0,0.1)',
        border: dark ? '1px solid rgba(255,255,255,0.1)' : 'none',  // outline dark
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        gap: 17,
      }}
    >
      {/* Search icon — exact path from Figma (viewBox 0 0 20 20) */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
          stroke={dark ? 'rgba(255,255,255,0.4)' : '#AAACB0'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text input */}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={dark ? 'placeholder:text-white/35' : 'placeholder:text-[#AAACB0]'}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 16,
          fontWeight: 400,
          color: dark ? '#ffffff' : '#1a1a1a',
          minWidth: 0,
        }}
      />

      {/* Sliders / filter icon — exact path from Figma (viewBox 0 0 22 20.625) */}
      <button
        onClick={onFilterPress}
        aria-label="Filter"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: onFilterPress ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 20.625"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1.03125 2.40625C0.459766 2.40625 0 2.86602 0 3.4375C0 4.00898 0.459766 4.46875 1.03125 4.46875H4.97148C5.40977 5.86523 6.71172 6.875 8.25 6.875C9.78828 6.875 11.0902 5.86523 11.5285 4.46875H20.9688C21.5402 4.46875 22 4.00898 22 3.4375C22 2.86602 21.5402 2.40625 20.9688 2.40625H11.5285C11.0902 1.00977 9.78828 0 8.25 0C6.71172 0 5.40977 1.00977 4.97148 2.40625H1.03125ZM1.03125 9.28125C0.459766 9.28125 0 9.74102 0 10.3125C0 10.884 0.459766 11.3438 1.03125 11.3438H11.8465C12.2848 12.7402 13.5867 13.75 15.125 13.75C16.6633 13.75 17.9652 12.7402 18.4035 11.3438H20.9688C21.5402 11.3438 22 10.884 22 10.3125C22 9.74102 21.5402 9.28125 20.9688 9.28125H18.4035C17.9652 7.88477 16.6633 6.875 15.125 6.875C13.5867 6.875 12.2848 7.88477 11.8465 9.28125H1.03125ZM1.03125 16.1562C0.459766 16.1562 0 16.616 0 17.1875C0 17.759 0.459766 18.2188 1.03125 18.2188H3.59648C4.03477 19.6152 5.33672 20.625 6.875 20.625C8.41328 20.625 9.71523 19.6152 10.1535 18.2188H20.9688C21.5402 18.2188 22 17.759 22 17.1875C22 16.616 21.5402 16.1562 20.9688 16.1562H10.1535C9.71523 14.7598 8.41328 13.75 6.875 13.75C5.33672 13.75 4.03477 14.7598 3.59648 16.1562H1.03125ZM6.875 18.5625C6.51033 18.5625 6.16059 18.4176 5.90273 18.1598C5.64487 17.9019 5.5 17.5522 5.5 17.1875C5.5 16.8228 5.64487 16.4731 5.90273 16.2152C6.16059 15.9574 6.51033 15.8125 6.875 15.8125C7.23967 15.8125 7.58941 15.9574 7.84727 16.2152C8.10513 16.4731 8.25 16.8228 8.25 17.1875C8.25 17.5522 8.10513 17.9019 7.84727 18.1598C7.58941 18.4176 7.23967 18.5625 6.875 18.5625ZM15.125 11.6875C14.7603 11.6875 14.4106 11.5426 14.1527 11.2848C13.8949 11.0269 13.75 10.6772 13.75 10.3125C13.75 9.94783 13.8949 9.59809 14.1527 9.34023C14.4106 9.08237 14.7603 8.9375 15.125 8.9375C15.4897 8.9375 15.8394 9.08237 16.0973 9.34023C16.3551 9.59809 16.5 9.94783 16.5 10.3125C16.5 10.6772 16.3551 11.0269 16.0973 11.2848C15.8394 11.5426 15.4897 11.6875 15.125 11.6875ZM6.875 3.4375C6.875 3.07283 7.01987 2.72309 7.27773 2.46523C7.53559 2.20737 7.88533 2.0625 8.25 2.0625C8.61467 2.0625 8.96441 2.20737 9.22227 2.46523C9.48013 2.72309 9.625 3.07283 9.625 3.4375C9.625 3.80217 9.48013 4.15191 9.22227 4.40977C8.96441 4.66763 8.61467 4.8125 8.25 4.8125C7.88533 4.8125 7.53559 4.66763 7.27773 4.40977C7.01987 4.15191 6.875 3.80217 6.875 3.4375Z"
            fill="#7458FD"
          />
        </svg>
      </button>
    </div>
  );
}
