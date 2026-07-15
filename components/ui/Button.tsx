import Link from "next/link";
import { cn } from "@/lib/cn";

type CommonProps = {
  variant?: "primary" | "brand" | "outline" | "accent" | "ghost" | "white" | "outlineWhite";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  // Dark button — the site's default style, for light backgrounds.
  // Tied to the same contentCardText color used for headings/body text on
  // those backgrounds, so it stays consistent if that color changes.
  primary:
    "bg-contentCardText-950 text-contentCard-50 shadow-md shadow-contentCardText-950/20 hover:bg-contentCardText-800",
  // Main action-button color, set from Strapi's buttonColor field.
  brand: "bg-button-600 text-white shadow-md shadow-button-600/25 hover:bg-button-700",
  accent: "bg-accent-400 text-white shadow-md shadow-accent-400/25 hover:bg-accent-500",
  outline:
    "border-2 border-contentCardText-950 text-contentCardText-950 hover:bg-contentCardText-950 hover:text-contentCard-50",
  ghost: "text-contentCardText-950 hover:bg-contentCard-100",
  // Solid white button for use on colored/dark section backgrounds — stays
  // literal white on purpose, it needs to contrast against whatever
  // brand/accent color is behind it, not follow a zone of its own.
  white: "bg-white text-slate-900 shadow-md hover:bg-slate-100",
  // Outlined button for use on colored/dark section backgrounds.
  outlineWhite: "border-2 border-white/70 text-white hover:bg-white/10",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-7 py-3.5 text-base sm:text-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-600";

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
