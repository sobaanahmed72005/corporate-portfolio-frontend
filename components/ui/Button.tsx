import Link from "next/link";
import { cn } from "@/lib/cn";

type CommonProps = {
  variant?: "primary" | "brand" | "outline" | "accent" | "ghost" | "white" | "outlineWhite";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  // Black pill — the site's default button style.
  primary: "bg-ink-950 text-ink-50 shadow-md shadow-ink-950/20 hover:bg-ink-800",
  // Vivid blue pill — used for primary hero/page CTAs.
  brand: "bg-brand-600 text-white shadow-md shadow-brand-600/25 hover:bg-brand-700",
  accent: "bg-accent-400 text-white shadow-md shadow-accent-400/25 hover:bg-accent-500",
  outline: "border-2 border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-ink-50",
  ghost: "text-ink-950 hover:bg-ink-50",
  // Solid white button for use on colored/dark section backgrounds.
  white: "bg-white text-ink-950 shadow-md hover:bg-slate-100",
  // Outlined button for use on colored/dark section backgrounds.
  outlineWhite: "border-2 border-white/70 text-white hover:bg-white/10",
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-sm sm:text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

type LinkButtonProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type NativeButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: NativeButtonProps) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
