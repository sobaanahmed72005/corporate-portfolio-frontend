type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.25-1.5 1.53-1.5H16.5V4.3c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.79 1.37-3.79 3.89V10.5H8v3h2.43V21h3.07Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3.4a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 21h-3.37v-6.06c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2V21H9.35V8.5h3.24v1.71h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.6 2.25 4.6 5.17V21Z" />
    </svg>
  );
}
