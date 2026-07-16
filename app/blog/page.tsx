import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getBlogPosts, getCompanyInfo } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  return {
    title: "Blog",
    description: `Practical guides on CCTV, solar, networking, and IT accessories from ${company.name}.`,
  };
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="bg-contentCard-50">
      <section className="border-b border-section-200 bg-section-50 py-14">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">Our Blog</h1>
          <p className="mt-2 max-w-2xl text-sectionText-600">
            Practical guides on CCTV, solar power, networking, and IT
            accessories — written from what we see on real installations.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-3xl border border-contentCard-200 bg-contentCard-50 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg"
            >
              <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-700">
                {post.category}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-contentCardText-950">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
                  {post.title}
                </Link>
              </h2>
              <div className="mt-2 flex items-center gap-3 text-xs text-contentCardText-600">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" aria-hidden />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                  {post.date}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm text-contentCardText-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Continue Reading <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
