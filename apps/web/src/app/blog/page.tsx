/**
 * Blog index page — route: /blog
 *
 * Lists all published posts (newest first).
 * Draft posts (publishedAt = null) are excluded by the API.
 */
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { fetchPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog — Nguyen Quoc Cong",
  description: "Notes on mobile development, full-stack engineering, and AI tooling.",
};

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "140px 32px 80px" }}>
      <p
        style={{
          fontSize: 13,
          color: "#f5a623",
          letterSpacing: 3,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        Blog
      </p>
      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 900,
          letterSpacing: -1,
          marginBottom: 48,
        }}
      >
        Notes &amp; Articles
      </h1>

      {posts.length === 0 ? (
        <p style={{ color: "#888888", fontSize: 16 }}>No posts yet — check back soon.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "28px 32px",
                }}
              >
                {/* Tags */}
                {post.tags.length > 0 && (
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                )}

                <h2
                  style={{
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: 10,
                    lineHeight: 1.25,
                  }}
                >
                  {post.title}
                </h2>

                <p style={{ fontSize: 15, color: "#888888", lineHeight: 1.7, marginBottom: 14 }}>
                  {post.excerpt}
                </p>

                <p style={{ fontSize: 12, color: "#888888", letterSpacing: 1 }}>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
