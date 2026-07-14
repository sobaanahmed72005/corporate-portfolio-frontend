import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import { getBlogPosts } from "@/lib/cms";

export async function LatestUpdates() {
  const blogPosts = await getBlogPosts();
  const [featured, ...rest] = blogPosts.slice(0, 4);

  if (!featured) return null;

  return (
    <section className="bg-page-950 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="From the Blog" title="Latest Updates" onDark />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Link
            href={`/blog/${featured.slug}`}
            className="group flex flex-col justify-end rounded-3xl border border-cardText-50/10 bg-gradient-to-br from-card-800 to-card-950 p-8 transition-colors hover:border-cardText-50/25 sm:p-10"
          >
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-brand-300">
              {featured.category}
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-cardText-50 sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cardText-400">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cardText-50">
              Read the article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>

          <div className="flex flex-col divide-y divide-cardText-50/10 rounded-3xl border border-cardText-50/10">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-1 p-5 transition-colors hover:bg-cardText-50/5"
              >
                <p className="font-display text-[11px] font-semibold uppercase tracking-wide text-brand-300">
                  {post.category}
                </p>
                <h4 className="line-clamp-2 text-sm font-semibold text-cardText-50">{post.title}</h4>
                <p className="text-xs text-cardText-500">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/blog" className={cn(GRADIENT_PILL_BASE, GRADIENTS.blue.pill, "w-fit")}>
            Read More on the Blog <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
