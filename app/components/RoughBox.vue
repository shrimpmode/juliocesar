<template>
  <svg ref="svgRef" class="w-full h-full"></svg>
</template>

<script setup lang="ts">
import type { RoughBoxOptions } from "~/utils/roughBox";
import { drawRoughBox } from "~/utils/roughBox";

// Props interface
interface Props {
  // Rough styling options
  roughness?: number;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: "solid" | "hachure" | "cross-hatch" | "zigzag" | "dots" | "dashed" | "zigzag-line";
  fillWeight?: number;
  stroke?: string;
}

const props = withDefaults(defineProps<Props>(), {
  roughness: 4,
  strokeWidth: 2.5,
});

const svgRef = ref<SVGElement | null>(null);
const { $rough } = useNuxtApp();

const drawBox = () => {
  if (!svgRef.value) return;

  const svg = svgRef.value;

  // Clear previous content
  svg.innerHTML = "";

  // Get actual SVG dimensions
  const { width, height } = svg.getBoundingClientRect();

  // Set viewBox to match dimensions
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  // Create rough context
  const rc = $rough.svg(svg);

  // Prepare options from props (only include defined values)
  const options: RoughBoxOptions = {
    roughness: props.roughness,
    strokeWidth: props.strokeWidth,
  };

  // Only add optional props if they're defined
  if (props.fill !== undefined) options.fill = props.fill;
  if (props.fillStyle !== undefined) options.fillStyle = props.fillStyle;
  if (props.fillWeight !== undefined) options.fillWeight = props.fillWeight;
  if (props.stroke !== undefined) options.stroke = props.stroke;

  // Draw the box using utility function
  const box = drawRoughBox(rc, width, height, options);
  svg.appendChild(box);
};

onMounted(async () => {
  await nextTick();
  drawBox();
  window.addEventListener("resize", drawBox);
});

onUnmounted(() => {
  window.removeEventListener("resize", drawBox);
});
</script>
