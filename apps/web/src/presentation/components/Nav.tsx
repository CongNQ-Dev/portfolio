/**
 * Nav — site-wide navigation bar.
 *
 * Server component: no interactivity needed here (active-link highlighting
 * on the home page was done with a scroll listener in the legacy site;
 * Next.js Link handles active states declaratively via usePathname in a
 * client wrapper if needed later).
 */
import Link from "next/link";

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 48px",
      }}
    >
      <Link
        href="/"
        style={{
          width: 40,
          height: 40,
          background: "#ffffff",
          color: "#111111",
          fontWeight: 900,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          letterSpacing: -1,
          textDecoration: "none",
        }}
      >
        C
      </Link>

      <ul
        style={{
          display: "flex",
          gap: 52,
          listStyle: "none",
        }}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} style={linkStyle} target={link.target}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "2.5px",
  textTransform: "uppercase",
};

const NAV_LINKS = [
  { href: "/#skills",      label: "Skills",    target: undefined },
  { href: "/#ai-workflow", label: "AI",        target: undefined },
  { href: "/#projects",    label: "Projects",  target: undefined },
  { href: "/#contact",     label: "Contact",   target: undefined },
  { href: "/cv",           label: "Resume",    target: "_blank" as const },
  { href: "/roadmap",      label: "Roadmap",   target: undefined },
];
