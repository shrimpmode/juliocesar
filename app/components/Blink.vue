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
onMounted(() => {
  const interval = setInterval(() => {
    isVisible.value = !isVisible.value;
  }, delay);

  return () => {
    interval.clear();
  };
});
</script>
