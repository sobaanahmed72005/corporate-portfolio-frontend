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
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="From the Blog" title="Latest Updates" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 p-5 shadow-sm transition-shadow hover:shadow-lg"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-brand-600">
                {post.category}
              </p>
              <h3 className="mt-2 line-clamp-2 text-base font-semibold text-ink-950">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{post.excerpt}</p>
              <p className="mt-4 text-xs text-slate-400">{post.date}</p>
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
