/**
 * Blog post detail page — route: /blog/[slug]
 *
 * Fetches a single published post from the API and renders the Markdown
 * `content` field as HTML using the `marked` library.
 *
 * `marked` is a server-side-friendly Markdown → HTML converter.
 * The resulting HTML is injected via dangerouslySetInnerHTML.
 * For a public blog you would also want to sanitise the HTML with DOMPurify
 * (or a server-side equivalent) to prevent XSS attacks.
 */
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { fetchPostBySlug } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

// generateMetadata runs on the server before the page renders.
// It lets us set the page <title> dynamically from the post data.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Nguyen Quoc Cong`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound(); // renders Next.js built-in 404 page
  }

  // Convert Markdown → HTML on the server. No client JavaScript needed.
  const htmlContent = await marked(post.content, { async: true });

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "140px 32px 80px" }}>
      {/* Back link */}
      <Link
        href="/blog"
        style={{
          fontSize: 13,
          color: "#888888",
          textDecoration: "none",
          letterSpacing: 1,
          textTransform: "uppercase",
          display: "inline-block",
          marginBottom: 40,
        }}
      >
        ← All posts
      </Link>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: -1,
          marginBottom: 16,
        }}
      >
        {post.title}
      </h1>

      {/* Published date */}
      {post.publishedAt && (
        <p style={{ fontSize: 13, color: "#888888", letterSpacing: 1, marginBottom: 40 }}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 40 }} />

      {/* Rendered Markdown */}
      <div
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
