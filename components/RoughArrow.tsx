"use client";

import { useLayoutEffect, useRef } from "react";
import rough from "roughjs";

// Curved shaft from the bottom-left, sweeping up to the tip at top-right
const start = [20, 112];
const control = [25, 55];
const tip = [110, 10];
const headLength = 18;
const headAngle = Math.PI / 6;

type RoughArrowProps = {
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
};

/**
 * Hand-drawn arrow. The shaft and head get the classes `arrow-shaft` and
 * `arrow-head` so a parent can animate them separately.
 */
export default function RoughArrow({
  stroke = "#484149",
  strokeWidth = 2.5,
  roughness = 1.5,
}: RoughArrowProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Layout effect: children's layout effects run before the parent's, so the
  // paths exist when the parent's GSAP timeline (also a layout effect) looks
  // them up
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rc = rough.svg(svg);
    const options = { stroke, strokeWidth, roughness };

    const shaft = rc.path(
      `M ${start[0]} ${start[1]} Q ${control[0]} ${control[1]} ${tip[0]} ${tip[1]}`,
      options,
    );
    shaft.classList.add("arrow-shaft");

    // Arrowhead follows the curve's direction at the tip
    const angle = Math.atan2(tip[1] - control[1], tip[0] - control[0]);
    const heads = [angle + Math.PI - headAngle, angle + Math.PI + headAngle].map(
      (a) => {
        const head = rc.line(
          tip[0],
          tip[1],
          tip[0] + headLength * Math.cos(a),
          tip[1] + headLength * Math.sin(a),
          options,
        );
        head.classList.add("arrow-head");
        return head;
      },
    );

    svg.replaceChildren(shaft, ...heads);
  }, [stroke, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 120"
      className="w-full h-auto"
      aria-hidden="true"
    />
  );
}
