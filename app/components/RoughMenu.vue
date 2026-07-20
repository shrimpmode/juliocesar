<template>
  <button
    type="button"
    class="menu-button"
    :aria-label="modelValue ? 'Close menu' : 'Open menu'"
    :aria-expanded="modelValue"
    aria-controls="navigation-menu"
    @click="toggleMenu"
  >
    <svg
      ref="menu"
      width="32px"
      height="32px"
      aria-hidden="true"
      focusable="false"
    ></svg>
  </button>
</template>

<script setup lang="ts">
import rough from "roughjs";

const menu = ref<SVGSVGElement | null>(null);

const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [boolean];
}>();

onMounted(() => {
  drawMenu();
  window.addEventListener("resize", drawMenu);
});

onUnmounted(() => {
  window.removeEventListener("resize", drawMenu);
});

function drawMenu() {
  const svg = menu.value;
  if (!svg) return;

  // Clear previous content
  svg.innerHTML = "";

  const rc = rough.svg(svg);
  const node = rc.line(0, 0, 32, 0, {
    stroke: "#000000",
    strokeWidth: 2,
  });
  const node2 = rc.line(0, 12, 32, 12, {
    stroke: "#000000",
    strokeWidth: 2,
  });
  const node3 = rc.line(0, 24, 32, 24, {
    stroke: "#000000",
    strokeWidth: 2,
  });
  svg.appendChild(node);
  svg.appendChild(node2);
  svg.appendChild(node3);
}

function toggleMenu() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped>
.menu-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.menu-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-button:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
}

.menu-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
