"use client";

import { useLayoutEffect, useRef } from "react";
import rough from "roughjs";

type RoughDoodleProps = {
  /** SVG path data, drawn in order, in the coordinates of viewBox */
  paths: string[];
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  roughness?: number;
  /** Stretch to the element's box instead of keeping the aspect ratio
      (strokes keep their width either way) */
  stretch?: boolean;
};

/**
 * Hand-drawn outline of arbitrary paths, in the current text color. The
 * generated strokes are <path>s inside the svg, so a parent can animate them
 * with DrawSVG through a selector like `.my-doodle path`.
 */
export default function RoughDoodle({
  paths,
  viewBox,
  className = "",
  strokeWidth = 2,
  roughness = 1.2,
  stretch = false,
}: RoughDoodleProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsKey = paths.join("|");

  // Layout effect, as in RoughArrow: the strokes must exist before the
  // parent's GSAP timeline (also a layout effect) looks them up
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rc = rough.svg(svg);
    const drawn = pathsKey.split("|").map((d) =>
      rc.path(d, { stroke: "currentColor", strokeWidth, roughness }),
    );
    svg.replaceChildren(...drawn);
  }, [pathsKey, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio={stretch ? "none" : undefined}
      className={`overflow-visible [&_path]:[vector-effect:non-scaling-stroke] ${className}`}
      aria-hidden="true"
    />
  );
}
