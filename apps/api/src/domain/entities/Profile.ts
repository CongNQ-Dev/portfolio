/**
 * Profile — the portfolio owner's public identity data.
 *
 * DOMAIN LAYER RULE: this file has zero imports from any framework.
 * It describes WHAT data exists, not HOW it is stored or displayed.
 * Both the application layer (services) and the infrastructure layer
 * (Prisma repositories) depend on this type — never the reverse.
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
