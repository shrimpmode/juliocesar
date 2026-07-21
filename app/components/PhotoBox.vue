<template>
  <div class="">
    <RoughBox :fill-style="'cross-hatch'" fill="#5B5F8D" v-if="isVisible" />
    <RoughBox fill="#5B5F8D" fill-style="cross-hatch" v-else />
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
