/**
 * ResourceType — badge category shown beside each roadmap resource.
 */
export type ResourceType = "video" | "course" | "docs" | "book" | "practice";

/**
 * RoadmapResource — a single learning resource (video, course, book, …)
 * inside a roadmap phase.
 *
 * `dataId` matches the HTML `data-id` attribute used for localStorage
 * progress tracking (e.g. "p1-cs50"). Keeping the same IDs means
 * migrating from the legacy site preserves existing user progress.
 */
export interface RoadmapResource {
  id: string;
  dataId: string;
  type: ResourceType;
  title: string;
  url: string;
  source: string;
  order: number;
}

/**
 * RoadmapPhase — one of the six learning phases on the roadmap page.
 */
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
