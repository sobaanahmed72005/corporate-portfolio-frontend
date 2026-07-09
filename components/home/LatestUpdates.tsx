import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import { blogPosts } from "@/lib/data/blog";

const latest = blogPosts.slice(0, 4);

export function LatestUpdates() {
  return (
    <section className="bg-black py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="From the Blog" title="Latest Updates" onDark />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-brand-300">
                {post.category}
              </p>
              <h3 className="mt-2 line-clamp-2 text-base font-semibold text-white">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-400">{post.excerpt}</p>
              <p className="mt-4 text-xs text-slate-500">{post.date}</p>
            </Link>
          ))}
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
