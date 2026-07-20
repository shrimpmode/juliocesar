<template>
  <svg ref="svgRef" class="w-full h-full"></svg>
</template>

<script setup lang="ts">
// Props interface
interface Props {
  // Rough styling options
  roughness?: number;
  strokeWidth?: number;
  fill?: string;
  fillStyle?: "solid" | "hachure" | "cross-hatch" | "zigzag" | "dots" | "dashed" | "zigzag-line";
  stroke?: string;
}

const props = withDefaults(defineProps<Props>(), {
  roughness: 4,
  strokeWidth: 2.5,
  fill: "#f7af25",
  fillStyle: "solid",
  stroke: "none",
});

const svgRef = ref<SVGElement | null>(null);
const { $rough } = useNuxtApp();

const drawCircle = () => {
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

  // Prepare options from props
  const options: any = {
    roughness: props.roughness,
    strokeWidth: props.strokeWidth,
  };

  // Only add optional props if they're defined
  if (props.fill !== undefined) options.fill = props.fill;
  if (props.fillStyle !== undefined) options.fillStyle = props.fillStyle;
  if (props.stroke !== undefined) options.stroke = props.stroke;

  // Calculate circle center and diameter (account for stroke width to prevent clipping)
  const centerX = width / 2;
  const centerY = height / 2;
  // Need extra padding for roughness variations which extend beyond stroke width
  const padding = (props.strokeWidth + props.roughness) * 2;
  const diameter = Math.min(width, height) - padding;

  // Draw the circle
  const circle = rc.circle(centerX, centerY, diameter, options);
  svg.appendChild(circle);
};

onMounted(async () => {
  await nextTick();
  drawCircle();
  window.addEventListener("resize", drawCircle);
});

onUnmounted(() => {
  window.removeEventListener("resize", drawCircle);
});
</script>
