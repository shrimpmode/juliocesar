<template>
  <div class="relative">
    <div v-if="isVisible">
      <slot name="first" />
    </div>
    <div v-else>
      <slot name="second" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { delay = 1000 } = defineProps<{
  delay?: number;
}>();

const isVisible = ref(true);
let intervalId: number | null = null;

onMounted(() => {
  intervalId = setInterval(() => {
    isVisible.value = !isVisible.value;
  }, delay);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>
