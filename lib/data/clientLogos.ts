export type ClientLogo = {
  id: string;
  alt: string;
  src?: string;
};

/**
 * "Trusted by" logo wall. Every entry is a PLACEHOLDER empty slot on
 * purpose — do not fill these with a competitor's or any other real
 * company's logo without their permission. Once you have your own real
 * client's permission to display their logo, add `src: "/logos/whatever.svg"`
 * (drop the file in `public/logos/`) and it renders automatically; leave
 * `src` unset to keep showing the empty slot.
 */
export const clientLogos: ClientLogo[] = Array.from({ length: 10 }, (_, i) => ({
  id: `client-${i + 1}`,
  alt: `Client logo placeholder ${i + 1}`,
}));