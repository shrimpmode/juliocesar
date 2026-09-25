<template>
  <NuxtLink
    v-for="link in links"
    :key="link.to"
    class="flex items-center justify-center hover:scale-105 transition-all"
    :class="link.classes"
    :to="link.to"
    @click="$emit('link-click')"
  >
    {{ link.name }}
  </NuxtLink>
  <div class="h-full w-full" :class="navBlockClass">
    <NavBlock />
  </div>
</template>

<script setup>
defineProps({
  links: { type: Array, required: true },
  navBlockClass: { type: String, default: "" },
});
defineEmits(["link-click"]);
</script>
