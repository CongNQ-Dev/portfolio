/**
 * Profile — the portfolio owner's public identity data.
 *
 * This is a plain TypeScript interface with no framework dependencies.
 * The domain layer describes WHAT data exists; it doesn't care HOW it
 * is stored or displayed.
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
