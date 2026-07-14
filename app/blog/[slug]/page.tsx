import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getBlogPost, getBlogPosts } from "@/lib/cms";

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Blog
          </Link>
          <span className="mt-4 block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {post.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" aria-hidden />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden />
              {post.date}
            </span>
          </div>
        </Container>
      </section>

      <Container className="max-w-3xl py-16">
        <div className="space-y-5 text-base leading-relaxed text-slate-700">
          {post.body.split(/\n{2,}/).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>

      <CtaBanner
        title="Have a Project in Mind?"
        description="Get in touch and we'll help you plan the right setup for your home or business."
        primaryLabel="Contact Us"
      />
    </>
  );
}