import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/cn";
import { getWhatsAppLink, type CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

export function SocialSidebar({ company }: { company: CompanyInfo }) {
  const links = [
    {
      href: getWhatsAppLink(company),
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      className: "bg-[#25D366] hover:bg-[#20BD5A]",
    },
    {
      href: company.social.facebook,
      label: "Facebook",
      Icon: FacebookIcon,
      className: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      href: company.social.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
      className: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90",
    },
    {
      href: company.social.linkedin,
      label: "LinkedIn",
      Icon: LinkedinIcon,
      className: "bg-[#0A66C2] hover:bg-[#0958AB]",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col shadow-lg">
      {links.map(({ href, label, Icon, className }) => (
        <a
          key={label}
          href={safeHref(href)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "flex h-10 w-10 items-center justify-center text-white transition-transform duration-200 hover:scale-105 sm:h-11 sm:w-11",
            className,
          )}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
      ))}
    </div>
  );
}
