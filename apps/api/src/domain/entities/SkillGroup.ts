/**
 * Skill — a single technology or tool in the skills grid.
 *
 * Icon rendering priority (evaluated left-to-right by the frontend):
 *  1. iconPath — public path to an SVG/image, e.g. "/icons/flutter.svg"
 *  2. iconText — short text label, e.g. "NB", styled with iconColor on iconBg
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
