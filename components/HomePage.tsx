"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import RoughBox from "@/components/RoughBox";
import RoughArrow from "@/components/RoughArrow";
import RoughDoodle from "@/components/RoughDoodle";
import { basePath } from "@/lib/basePath";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

// Doodle shapes, each in its own viewBox (see RoughDoodle)
const doodles = {
  underline: ["M2 9 Q35 3 60 6 T98 5"],
  shine: ["M8 28 L0 20", "M20 20 L20 4", "M32 28 L40 20"],
  star: ["M50 8 L61 38 L93 38 L67 57 L77 88 L50 69 L23 88 L33 57 L7 38 L39 38 Z"],
  squiggle: ["M5 30 Q17 5 29 30 T53 30 T77 30 T101 30"],
  // Half circles of growing radius, alternating sides
  spiral: [
    "M50 50 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a12 12 0 1 1 24 0 a16 16 0 1 1 -32 0 a20 20 0 1 1 40 0",
  ],
};

export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);

  // Photo, then "this is me", then the arrow draws toward the photo, then the
  // intro, the name's underline and the doodles; visitors who prefer reduced
  // motion get the page without animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".photo", {
            y: 40,
            rotate: -8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          })
          .from(
            ".arrow-label",
            { scale: 0.6, opacity: 0, duration: 0.4, ease: "back.out(2)" },
            "-=0.3",
          )
          .from(".arrow-shaft path", {
            drawSVG: 0,
            duration: 0.6,
            ease: "power1.inOut",
          })
          .from(".arrow-head path", { drawSVG: 0, duration: 0.2, stagger: 0.1 })
          .from(
            ".intro-line",
            { x: 40, opacity: 0, duration: 0.6, stagger: 0.15 },
            "-=0.1",
          )
          .from(".name-underline path", {
            drawSVG: 0,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .from(
            // Only doodles on screen: the margin ones are display:none on phones
            gsap.utils
              .toArray<SVGPathElement>(".doodle path")
              .filter((path) => path.getClientRects().length > 0),
            { drawSVG: 0, duration: 0.6, stagger: 0.1, ease: "power1.inOut" },
            "-=0.2",
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-cream h-screen w-screen text-primary relative">
      <RoughBox roughness={4} strokeWidth={2.5} className="absolute inset-0" />
      {/* Margin doodles; hidden on phones, where the content fills the screen */}
      <div className="hidden md:block pointer-events-none">
        <RoughDoodle
          paths={doodles.star}
          viewBox="0 0 100 100"
          className="doodle absolute top-[12%] right-[10%] w-14 rotate-12 text-orange"
        />
        <RoughDoodle
          paths={doodles.squiggle}
          viewBox="0 0 106 60"
          className="doodle absolute bottom-[12%] left-[22%] w-28 -rotate-6"
        />
        <RoughDoodle
          paths={doodles.spiral}
          viewBox="24 24 56 52"
          // Tight loops smudge at the default roughness
          roughness={0.5}
          className="doodle absolute bottom-[14%] right-[12%] w-20"
        />
      </div>
      {/* Stacked on small screens; arrow and description beside the photo from lg.
          m-auto centers the content but, unlike items-center, lets it start
          below the nav row and scroll on very short phones instead of spilling
          under the nav */}
      <main className="relative z-10 flex h-full overflow-y-auto px-8 pt-16 pb-6 lg:py-0 lg:overflow-visible">
        <div className="relative m-auto flex flex-col items-center gap-4 sm:gap-6 lg:block">
          <div className="transition-transform duration-300 hover:rotate-2 hover:scale-105">
            {/* Taped to the page like the sticky notes; tape and shine marks
                move with the photo */}
            <div className="photo relative">
              <Image
                src={`${basePath}/jc.webp`}
                alt="Julio Cesar"
                width={512}
                height={682}
                priority
                className="w-48 max-h-60 lg:w-64 lg:max-h-80 h-auto rounded-md"
              />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3 w-20 h-6 pointer-events-none">
                <RoughBox
                  roughness={1}
                  strokeWidth={0.5}
                  fill="rgba(255, 255, 255, 0.6)"
                  fillStyle="solid"
                  stroke="rgba(72, 65, 73, 0.3)"
                  className="absolute inset-0 overflow-visible"
                />
              </div>
              <RoughDoodle
                paths={doodles.shine}
                viewBox="0 0 40 30"
                className="doodle absolute -top-7 -right-9 w-10 text-orange"
              />
            </div>
          </div>
          <div className="-mt-4 -translate-x-12 w-24 flex flex-col items-center lg:absolute lg:bottom-0 lg:right-full lg:mt-0 lg:mr-6 lg:translate-x-0 lg:w-32">
            <RoughArrow />
            <span className="arrow-label relative right-8 text-3xl lg:text-4xl whitespace-nowrap">
              this is me
            </span>
          </div>
          <div className="order-first text-center lg:text-left lg:absolute lg:left-full lg:top-1/2 lg:-translate-y-1/2 lg:ml-12 lg:w-80 xl:w-96">
            <h1 className="intro-line text-3xl sm:text-4xl xl:text-5xl pb-2 font-semibold">
              Hi! I&apos;m{" "}
              <span className="relative whitespace-nowrap">
                Julio Cesar
                <RoughDoodle
                  paths={doodles.underline}
                  viewBox="0 0 100 12"
                  stretch
                  strokeWidth={3}
                  className="name-underline absolute left-0 -bottom-1 w-full h-3 text-orange"
                />
              </span>
            </h1>
            <p className="intro-line text-xl sm:text-2xl xl:text-3xl">
              Software engineer based in Lima, Peru.
            </p>
            <p className="intro-line text-xl sm:text-2xl xl:text-3xl pt-2">
              Experienced in building AI products and AI engineering.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
