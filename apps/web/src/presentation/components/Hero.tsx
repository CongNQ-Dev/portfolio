/**
 * Hero — the full-viewport landing section.
 *
 * Server component. Receives Profile data from the parent page.
 * The counter animation (0 → 4+) is done in HeroCounter, which is a
 * lightweight client component embedded here.
 */
import type { Profile } from "@/types";
import HeroCounter from "./HeroCounter";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 15vw",
        position: "relative",
      }}
    >
      {/* Social links — left sidebar */}
      <div
        style={{
          position: "absolute",
          left: 48,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.65s both",
        }}
      >
        <SocialLink href={profile.github} title="GitHub">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
        </SocialLink>
        <SocialLink href={profile.linkedin} title="LinkedIn">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </SocialLink>
        <SocialLink href={`mailto:${profile.email}`} title="Email">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </SocialLink>
      </div>

      {/* Years badge */}
      <div
        style={{
          fontSize: 13,
          color: "#f5a623",
          letterSpacing: 1,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 8,
          animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.05s both",
        }}
      >
        <HeroCounter target={profile.yearsExp} />+ Years Development Experience
      </div>

      {/* "Hi I am" line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 12,
          animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s both",
        }}
      >
        <p style={{ color: "#888888", fontSize: 22, fontWeight: 300, whiteSpace: "nowrap" }}>
          Hi I am
        </p>
        <div style={{ flex: 1, height: 1, background: "#f5a623" }} />
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: "clamp(60px, 8vw, 110px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: -2,
          marginBottom: 12,
          animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s both",
        }}
      >
        {profile.name}
      </h1>

      {/* Title */}
      <p
        style={{
          fontSize: "clamp(18px, 2.5vw, 28px)",
          fontWeight: 800,
          color: "#f5a623",
          letterSpacing: 4,
          textTransform: "uppercase",
          animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.5s both",
        }}
      >
        {profile.title}
      </p>

      {/* Quote */}
      <p
        style={{
          marginTop: 16,
          color: "#888888",
          fontSize: 15,
          fontStyle: "italic",
          letterSpacing: "0.5px",
          animation: "fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.65s both",
        }}
      >
        &ldquo;{profile.quote}&rdquo;
      </p>

      {/* Scroll indicator — right side */}
      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: 80,
          writingMode: "vertical-rl",
          fontSize: 12,
          letterSpacing: 3,
          color: "#888888",
          textTransform: "uppercase",
        }}
      >
        Scroll
      </div>
    </section>
  );
}

function SocialLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      title={title}
      style={{ color: "#ffffff", textDecoration: "none" }}
    >
      {children}
    </a>
  );
}
