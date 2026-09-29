"use client";

import { useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RoughBox from "@/components/RoughBox";

gsap.registerPlugin(useGSAP);

// 24x24 icons: mail from Lucide (ISC), brand marks from Simple Icons (CC0)
const icons = {
  mail: {
    stroke: true,
    paths: [
      "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
      "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    ],
  },
  github: {
    stroke: false,
    paths: [
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    ],
  },
  linkedin: {
    stroke: false,
    paths: [
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    ],
  },
};

type ContactLink = {
  label: string;
  text: string;
  href: string;
  icon: keyof typeof icons;
  // Note paper color and tilt class, as on the skills page
  color: string;
  tilt: string;
  external?: boolean;
  // The arrow points at this one
  preferred?: boolean;
};

// Pages are pre-rendered to HTML at build time. The email is only assembled
// in the browser, so it never appears as one string in the HTML or the bundle.
// The parts are stored reversed: the minifier folds ["a", "b"].join("@") into
// a single string literal, but not a reverse().
const emailParts = ["gmail.com", "jcsile444"];
const noopSubscribe = () => () => { };
const useIsClient = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

export default function ContactPage() {
  const isClient = useIsClient();
  const email = isClient ? [...emailParts].reverse().join("@") : "";

  // Paper colors avoid sage, the page background
  const links: ContactLink[] = [
    {
      label: "Email",
      text: email,
      href: email ? `mailto:${email}` : "#",
      icon: "mail",
      color: "#F1DCBA", // cream
      tilt: "-rotate-2",
    },
    {
      label: "GitHub",
      text: "github.com/shrimpmode",
      href: "https://github.com/shrimpmode",
      icon: "github",
      color: "#BDD3CE", // mint
      tilt: "rotate-1",
      external: true,
    },
    {
      label: "LinkedIn",
      text: "linkedin.com/in/juliocsil444",
      href: "https://www.linkedin.com/in/juliocsil444/",
      icon: "linkedin",
      color: "#F7C8A6", // light orange
      tilt: "-rotate-1",
      external: true,
      preferred: true,
    },
  ];

  const root = useRef<HTMLDivElement>(null);

  // Heading and intro fade up, then the notes drop in; skipped for reduced motion.
  // Notes only move and fade (RoughBox measures its element to draw), and
  // clearProps hands transforms back to CSS so the hover tilts work.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".contact-intro", { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 })
          .from(
            ".contact-note",
            { y: 40, opacity: 0, duration: 0.6, stagger: 0.15, clearProps: "all" },
            "-=0.2",
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-sage text-primary h-screen w-screen relative">
      <RoughBox roughness={4} strokeWidth={2.5} className="absolute inset-0" />

      {/* Scroll layer, as on the skills page: the stacked notes scroll inside
          the fixed page border on short screens; main leaves room for the nav */}
      <div className="absolute inset-0 z-10 overflow-y-auto">
        <main className="flex items-center justify-center min-h-full p-8 pt-20 lg:pt-8 lg:pl-56">
          <div className="w-full max-w-md lg:max-w-5xl flex flex-col gap-6 lg:gap-8">
            <div>
              <h1 className="contact-intro text-4xl lg:text-6xl">Contact</h1>
              <p className="contact-intro mt-2 text-2xl lg:text-3xl">
                Feel free to reach out.
              </p>
            </div>

            {/* Bottom margin leaves room for the arrow under the preferred note */}
            <ul className="grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8 mb-36 lg:mb-40">
              {links.map((link) => {
                const icon = icons[link.icon];
                return (
                  <li key={link.label} className="relative">
                    {/* The tilt lives on this wrapper, not the animated note:
                        GSAP sets `rotate: none` inline while animating */}
                    <div
                      className={`h-full transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${link.tilt}`}
                    >
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="contact-note group relative flex h-full flex-col gap-1 p-4 pt-6 xl:p-6 xl:pt-8"
                      >
                        <RoughBox
                          roughness={1.5}
                          strokeWidth={1.5}
                          fill={link.color}
                          fillStyle="solid"
                          className="absolute inset-0 pointer-events-none overflow-visible drop-shadow-md"
                        />
                        {/* Strip of tape */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-2 w-20 h-6 pointer-events-none">
                          <RoughBox
                            roughness={1}
                            strokeWidth={0.5}
                            fill="rgba(255, 255, 255, 0.6)"
                            fillStyle="solid"
                            stroke="rgba(72, 65, 73, 0.3)"
                            className="absolute inset-0 overflow-visible"
                          />
                        </div>
                        <span className="relative flex items-center gap-3 text-3xl lg:text-4xl font-semibold">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-7 h-7 lg:w-8 lg:h-8 shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                            fill={icon.stroke ? "none" : "currentColor"}
                            stroke={icon.stroke ? "currentColor" : "none"}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            {icon.paths.map((d) => (
                              <path key={d} d={d} />
                            ))}
                          </svg>
                          {link.label}
                        </span>
                        <span className="grow-underline relative self-start text-xl xl:text-2xl min-h-[1lh] [overflow-wrap:anywhere]">
                          {link.text}
                        </span>
                      </a>
                    </div>

                    {/* {link.preferred && ( */}
                    {/*   // Tip of the arrow sits just under the note's center */}
                    {/*   <div className="absolute top-full right-1/2 mt-3 w-24 lg:w-28 flex flex-col items-center pointer-events-none"> */}
                    {/*     <RoughArrow /> */}
                    {/*     <span className="arrow-label relative right-8 w-40 text-center text-2xl lg:w-auto lg:whitespace-nowrap lg:text-3xl"> */}
                    {/*       best way to reach me */}
                    {/*     </span> */}
                    {/*   </div> */}
                    {/* )} */}
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
