/**
 * ResourceType — badge category shown beside each roadmap resource.
 */
export type ResourceType = 'video' | 'course' | 'docs' | 'book' | 'practice';

/**
 * RoadmapResource — a single learning resource inside a roadmap phase.
 *
 * `dataId` matches the HTML `data-id` attribute from the legacy site,
 * preserving localStorage progress when users migrate from the old site.
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
