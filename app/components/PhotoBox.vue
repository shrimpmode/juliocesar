<template>
  <div class="">
    <RoughBox :fill-style="'cross-hatch'" fill="#5B5F8D" v-if="isVisible" />
    <RoughBox fill="#5B5F8D" fill-style="cross-hatch" v-else />
    <slot />
  </div>
</template>

<script setup>
const isVisible = ref(true);
onMounted(() => {
  const interval = setInterval(() => {
    isVisible.value = !isVisible.value;
  }, 1000);

  return () => {
    interval.clear();
  };
});
</script>
