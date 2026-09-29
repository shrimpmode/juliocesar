"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";
import type { Options } from "roughjs/bin/core";

type RoughBoxProps = Pick<
  Options,
  "roughness" | "strokeWidth" | "fill" | "fillStyle" | "fillWeight" | "stroke"
> & { className?: string };

/** A hand-drawn rectangle that fills its container and redraws on resize. */
export default function RoughBox({
  className = "",
  roughness = 4,
  strokeWidth = 2.5,
  fill,
  fillStyle,
  fillWeight,
  stroke,
}: RoughBoxProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const draw = () => {
      // Layout size, not getBoundingClientRect(): that includes CSS transforms,
      // so a rotated or scaled box would be drawn at the wrong size
      const width = svg.clientWidth;
      const height = svg.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const options: Options = { roughness, strokeWidth };
      if (fill !== undefined) options.fill = fill;
      if (fillStyle !== undefined) options.fillStyle = fillStyle;
      if (fillWeight !== undefined) options.fillWeight = fillWeight;
      if (stroke !== undefined) options.stroke = stroke;

      svg.replaceChildren(
        rough.svg(svg).rectangle(0, 0, width, height, options),
      );
    };

    // Redraw whenever the box itself changes size (window resize, web font
    // loading, content reflow), not just on window resize
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(svg);
    return () => observer.disconnect();
  }, [roughness, strokeWidth, fill, fillStyle, fillWeight, stroke]);

  return (
    <svg
      ref={svgRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
