"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const links = [
  { name: "Home", href: "/" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

// trailingSlash makes the pathname "/skills/"; compare without it
const normalize = (path: string) => path.replace(/(.)\/$/, "$1");

/** Text nav: a row across the top on small screens, a column on the left from lg. */
export default function Nav() {
  const pathname = normalize(usePathname());
  const navRef = useRef<HTMLElement>(null);

  // Links slide in one after another on first load; skipped for reduced motion.
  // The nav lives in the root layout, so this doesn't replay on navigation.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".nav-link", {
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className="absolute z-20 top-6 inset-x-0 flex justify-center gap-8 text-2xl text-primary lg:inset-x-auto lg:top-1/2 lg:left-12 lg:-translate-y-1/2 lg:flex-col lg:items-start lg:gap-4 lg:text-4xl"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className="nav-link grow-underline"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
