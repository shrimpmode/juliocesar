// Interface for rough box options
export interface RoughBoxOptions {
  roughness?: number;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: "solid" | "hachure" | "cross-hatch" | "zigzag" | "dots" | "dashed" | "zigzag-line";
  fillWeight?: number;
  stroke?: string;
}

// Default options constant
const DEFAULT_ROUGH_BOX_OPTIONS: RoughBoxOptions = {
  roughness: 4,
  strokeWidth: 2.5,
};

/**
 * Draws a rough-styled rectangle using rough.js
 * @param rc - Rough.js canvas/SVG context
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 * @param options - Optional styling options
 * @returns SVG element created by rough.js
 */
export function drawRoughBox(
  rc: any,
  width: number,
  height: number,
  options: RoughBoxOptions = {}
): SVGElement {
  const mergedOptions = { ...DEFAULT_ROUGH_BOX_OPTIONS, ...options };

  return rc.rectangle(0, 0, width, height, mergedOptions);
}
