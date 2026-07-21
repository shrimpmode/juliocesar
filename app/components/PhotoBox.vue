<template>
  <div class="">
    <RoughBox
      fillStyle="cross-hatch"
      fill="#5B5F8D"
      :stroke-width="3"
      v-if="isVisible"
      :fill-weight="3"
      :roughness="4"
    />
    <RoughBox
      fill="#5B5F8D"
      fill-style="cross-hatch"
      :fill-weight="3"
      :stroke-width="3"
      v-else
    />
    <slot />
  </div>
</template>

<script setup>
const isVisible = ref(true);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    isVisible.value = !isVisible.value;
  }, 1000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>
