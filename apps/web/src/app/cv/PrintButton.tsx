"use client";
/**
 * PrintButton — client component that triggers window.print().
 *
 * Co-located with the CV page because it is only used there.
 * Kept as a separate file because Next.js requires that 'use client'
 * components are in their own file when the parent is a server component.
 */
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        background: "none",
        border: "none",
        color: "#000",
        cursor: "pointer",
        fontSize: "inherit",
        fontFamily: "inherit",
        padding: 0,
        textDecoration: "none",
      }}
    >
      Print / Save as PDF
    </button>
  );
}
