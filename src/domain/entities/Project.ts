/**
 * ProjectLink — an external link shown on a project card.
 */
export interface ProjectLink {
  label: string;
  href: string;
}

/**
 * Project — a portfolio project entry.
 *
 * `links` is typed as an array here in the domain.
 * The Prisma repository casts from Json → ProjectLink[] during mapping.
 */
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
  type: string;          // "company" | "personal"
  iconPath: string | null;
  visualVariant: string | null; // "v1"–"v6"
  order: number;
}
