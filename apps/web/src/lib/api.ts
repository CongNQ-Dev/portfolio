/**
 * API client — the web app's only connection to the NestJS backend.
 *
 * WHY A THIN WRAPPER INSTEAD OF DIRECT FETCH?
 *   - Single place to change the base URL (env var or deploy config).
 *   - Consistent error handling: a failed fetch returns null/[] instead of
 *     crashing the page — this keeps `next build` working even without a
 *     running API (pages use force-dynamic so no data is fetched at build time,
 *     but graceful fallbacks are good practice).
 *   - Easy to extend: add auth headers, request logging, or retry logic here
 *     without touching any page file.
 *
 * DATA FLOW:
 *   Browser → Next.js server component (page.tsx)
 *           → this file (fetch to NestJS)
 *           → NestJS API (apps/api)
 *           → Prisma → PostgreSQL
 *
 * CACHING:
 *   All fetches use `cache: 'no-store'` to always get fresh data.
 *   For a production site you'd add revalidation (e.g. `next: { revalidate: 60 }`)
 *   to cache responses at the Next.js edge for performance.
 */
import type {
  Profile,
  SkillGroup,
  Project,
  RoadmapPhase,
  Post,
} from '@/types';

// API_URL is read server-side only (not prefixed with NEXT_PUBLIC_).
// Default points to the NestJS dev server.
const API_URL = process.env.API_URL ?? 'http://localhost:4000';

/**
 * Internal helper — makes a GET request and returns the parsed JSON, or null
 * on any error. Never throws, so calling pages always get a value.
 */
async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    // Network errors (API not running, DNS failure, etc.) are swallowed.
    // The calling page handles the null/empty case gracefully.
    return null;
  }
}

// ─── Public fetch functions ─────────────────────────────────────────────────

export async function fetchProfile(): Promise<Profile | null> {
  return get<Profile>('/api/profile');
}

export async function fetchSkillGroups(): Promise<SkillGroup[]> {
  return (await get<SkillGroup[]>('/api/skill-groups')) ?? [];
}

export async function fetchProjects(): Promise<Project[]> {
  return (await get<Project[]>('/api/projects')) ?? [];
}

export async function fetchRoadmap(): Promise<RoadmapPhase[]> {
  return (await get<RoadmapPhase[]>('/api/roadmap')) ?? [];
}

export async function fetchPosts(): Promise<Post[]> {
  return (await get<Post[]>('/api/posts')) ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  return get<Post>(`/api/posts/${slug}`);
}
