/**
 * Skill — a single technology or tool in the skills grid.
 *
 * Icon rendering rules (evaluated in order):
 *  1. If iconPath is set, render an <img> from that public path.
 *  2. Otherwise render iconText (short label like "NB") with iconColor on iconBg.
 */
export interface Skill {
  id: string;
  name: string;
  iconPath: string | null;
  iconBg: string | null;
  iconText: string | null;
  iconColor: string | null;
  order: number;
}

/**
 * SkillGroup — a named category of skills (e.g. "Mobile", "Backend").
 */
export interface SkillGroup {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}
