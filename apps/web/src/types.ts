/**
 * Shared types for the web app — mirrors the domain entities in apps/api.
 *
 * These interfaces describe the JSON shape that the NestJS API returns.
 * They are intentionally identical to apps/api/src/domain/entities/*.ts
 * because the API serialises its domain entities directly to JSON.
 *
 * WHY NOT import from apps/api directly?
 *   The web app and the API are separate deployable units. Importing across
 *   workspace boundaries would couple their build pipelines. A simple types.ts
 *   is the right trade-off at this scale.
 *
 * FUTURE STEP: when the types drift or there are many shared contracts,
 *   extract to a third workspace: packages/types
 *   then both apps/api and apps/web import from "@portfolio/types".
 */

export interface Profile {
  id: string;
  name: string;
  title: string;
  yearsExp: number;
  email: string;
  github: string;
  linkedin: string;
  quote: string;
}

export interface Skill {
  id: string;
  name: string;
  iconPath: string | null;
  iconBg: string | null;
  iconText: string | null;
  iconColor: string | null;
  order: number;
}

export interface SkillGroup {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  slug: string;
  tag: string;
  name: string;
  desc: string;
  tech: string[];
  featuresLabel: string;
  features: string[];
  links: ProjectLink[];
  type: string;
  iconPath: string | null;
  visualVariant: string | null;
  order: number;
}

export type ResourceType = 'video' | 'course' | 'docs' | 'book' | 'practice';

export interface RoadmapResource {
  id: string;
  dataId: string;
  type: ResourceType;
  title: string;
  url: string;
  source: string;
  order: number;
}

export interface RoadmapPhase {
  id: string;
  number: number;
  eta: string;
  title: string;
  goal: string;
  tags: string[];
  milestone: string;
  resources: RoadmapResource[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string | null; // ISO 8601 string after JSON serialisation
  createdAt: string;
  updatedAt: string;
}
