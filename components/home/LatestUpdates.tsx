import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { getBlogPosts } from "@/lib/cms";

export async function LatestUpdates() {
  const blogPosts = await getBlogPosts();
  const [featured, ...rest] = blogPosts.slice(0, 4);

  if (!featured) return null;

  return (
    <section className="border-t border-pageText-950/10 bg-page-950 py-20 sm:py-32">
      <Container>
        <SectionHeading eyebrow="From the Blog" eyebrowColor="text-amber-500" title="Latest Updates" onDark />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Link
            href={`/blog/${featured.slug}`}
            className="group flex flex-col justify-end rounded-3xl border border-brand-700/20 bg-gradient-to-br from-brand-600 to-brand-900 p-8 transition-colors hover:from-brand-500 hover:to-brand-800 sm:p-10"
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-accent-300">
              {featured.category}
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-brand-50">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Read the article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>

          <div className="flex flex-col divide-y divide-cardText-950/10 rounded-3xl border border-cardText-950/10">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-1 p-5 transition-colors hover:bg-card-950"
              >
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-300">
                  {post.category}
                </p>
                <h4 className="line-clamp-2 text-sm font-semibold text-cardText-950">{post.title}</h4>
                <p className="text-xs text-cardText-500">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/blog" variant="brand" size="sm" className="w-fit">
            Read More on the Blog <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
