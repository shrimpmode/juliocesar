"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  siDjango,
  siFastapi,
  siGo,
  siGraphql,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
  siVuedotjs,
} from "simple-icons";
import RoughBox from "@/components/RoughBox";
import SimpleIcon from "@/components/SimpleIcon";

gsap.registerPlugin(useGSAP);

// color: note paper; tilt: rotate class
const groups = [
  {
    title: "Languages",
    color: "#F1DCBA", // cream
    tilt: "-rotate-2",
    skills: [
      { name: "Python", icon: siPython },
      { name: "TypeScript", icon: siTypescript },
      { name: "Go", icon: siGo },
    ],
  },
  {
    title: "Back End",
    color: "#DBDDB6", // sage
    tilt: "rotate-1",
    skills: [
      { name: "Django", icon: siDjango },
      { name: "FastAPI", icon: siFastapi },
      { name: "Node.js", icon: siNodedotjs },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "GraphQL", icon: siGraphql },
    ],
  },
  {
    title: "Front End",
    color: "#F7C8A6", // light orange
    tilt: "-rotate-1",
    skills: [
      { name: "React", icon: siReact },
      { name: "Vue", icon: siVuedotjs },
      { name: "Nuxt", icon: siNuxt },
      { name: "Next.js", icon: siNextdotjs },
    ],
  },
];

export default function SkillsPage() {
  const root = useRef<HTMLDivElement>(null);

  // Title, then notes drop in, then their chips; skipped for reduced motion.
  // Only move and fade (no scale): RoughBox measures its element to draw.
  // clearProps hands transforms back to CSS so the hover tilts work.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".skills-title", { y: 20, opacity: 0, duration: 0.5 })
          .from(
            ".skill-card",
            { y: 40, opacity: 0, duration: 0.6, stagger: 0.15, clearProps: "all" },
            "-=0.2",
          )
          .from(
            ".skill-chip",
            { y: 12, opacity: 0, duration: 0.35, stagger: 0.05, clearProps: "all" },
            "-=0.3",
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-mint text-primary h-screen w-screen relative">
      <RoughBox roughness={4} strokeWidth={2.5} className="absolute inset-0" />

      {/* Scroll layer: the notes scroll inside the fixed page border when they
          are taller than the screen (phones); main leaves room for the nav */}
      <div className="absolute inset-0 z-10 overflow-y-auto">
        <main className="flex items-center justify-center min-h-full p-8 pt-20 lg:pt-8 lg:pl-56">
          <div className="w-full max-w-5xl flex flex-col gap-6 lg:gap-8">
            <h1 className="skills-title text-4xl lg:text-6xl">Skills</h1>

            <div className="grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
              {groups.map((group) => (
                // Sticky note: rough filled paper, a strip of tape, a slight tilt.
                // The tilt lives on this wrapper, not the animated note: GSAP
                // sets `rotate: none` inline while animating, which would cancel
                // Tailwind's `rotate` utility.
                <div
                  key={group.title}
                  className={`transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${group.tilt}`}
                >
                  <section className="skill-card relative h-full p-4 pt-6 lg:p-6 lg:pt-8">
                    <RoughBox
                      roughness={1.5}
                      strokeWidth={1.5}
                      fill={group.color}
                      fillStyle="solid"
                      className="absolute inset-0 pointer-events-none overflow-visible drop-shadow-md"
                    />
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
                    <h2 className="relative text-2xl lg:text-4xl font-semibold mb-2 lg:mb-4">
                      {group.title}
                    </h2>
                    <ul className="relative flex flex-wrap gap-2 lg:gap-3">
                      {group.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="skill-chip relative flex items-center gap-2 px-3 lg:px-4 py-1 text-lg lg:text-2xl transition-transform duration-200 hover:-rotate-3"
                        >
                          <RoughBox
                            roughness={1.5}
                            strokeWidth={1.5}
                            className="absolute inset-0 pointer-events-none"
                          />
                          <SimpleIcon
                            icon={skill.icon}
                            className="relative shrink-0 w-4 h-4 lg:w-5 lg:h-5"
                          />
                          <span className="relative">{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
