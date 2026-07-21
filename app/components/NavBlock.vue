<template>
  <svg ref="svgRef" class="w-full h-full"></svg>
</template>

<script setup>
const { $rough } = useNuxtApp();
const svgRef = ref(null);

const drawShapes = () => {
  if (!svgRef.value) return;

  const svg = svgRef.value;

  // Clear previous content
  svg.innerHTML = "";

  // Get actual SVG dimensions
  const { width, height } = svg.getBoundingClientRect();

  // Set SVG viewBox to match dimensions
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const rc = $rough.svg(svg);

  // Original heart path dimensions: ~300x320, centered around (200, 220)
  const heartPath = `M 200 380 C 200 380, 50 250, 50 150 C 50 100, 100 60, 150 60 C 180 60, 200 80, 200 100 C 200 80, 220 60, 250 60 C 300 60, 350 100, 350 150 C 350 250, 200 380, 200 380 Z`;

  // Calculate scale to fit the heart in the SVG
  const scale = Math.min(width, height) / 500;

  // Calculate translation to center the heart
  const heartCenterX = 200;
  const heartCenterY = 220;
  const translateX = width / 2 - heartCenterX * scale;
  const translateY = height / 2 - heartCenterY * scale;

  let node = rc.path(heartPath, {
    fill: "#FF6666",
    fillStyle: "solid",
    roughness: 1,
    strokeWidth: 3,
  });

  // Apply transform to center and scale the heart
  node.setAttribute(
    "transform",
    `translate(${translateX}, ${translateY}) scale(${scale})`,
  );

  const rect = rc.rectangle(0, 0, width, height, {
    roughness: 2,
    fill: "#0E79B2",
    fillStyle: "solid",
    fillWeight: 4,
    strokeWidth: 3,
  });

  svg.appendChild(rect);
  svg.appendChild(node);
};

onMounted(async () => {
  await nextTick();
  drawShapes();
  window.addEventListener("resize", drawShapes);
});

onUnmounted(() => {
  window.removeEventListener("resize", drawShapes);
});
</script>
