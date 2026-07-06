"use client";
/**
 * HeroCounter — client component that animates a number from 0 to target.
 *
 * WHY client component: it uses useEffect and useState (React hooks that
 * only run in the browser). The parent Hero is a server component and simply
 * embeds this tiny piece of interactivity.
 *
 * This is the recommended Next.js pattern: keep server components as the
 * default, push interactivity to the smallest possible client boundary.
 */
import { useEffect, useState } from "react";

export default function HeroCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let cur = 0;
      const tick = setInterval(() => {
        cur++;
        setCount(cur);
        if (cur >= target) clearInterval(tick);
      }, 120);
      return () => clearInterval(tick);
    }, 800); // start after badge fade-in completes
    return () => clearTimeout(timer);
  }, [target]);

  return (
    <span style={{ fontSize: 36, fontWeight: 900, color: "#ffffff" }}>
      {count}
    </span>
  );
}
