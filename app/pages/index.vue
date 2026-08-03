<template>
  <div class="bg-cream h-screen text-primary relative">
    <RoughBox
      :roughness="4"
      :stroke-width="2.5"
      class="w-full h-full absolute inset-0"
    />
    <main class="p-8 relative z-10 flex flex-col h-full">
      <div class="py-8">
        <div class="text-6xl pb-4 font-semibold">Hi ! I'm Julio Cesar</div>
        <div class="text-4xl">I'm a full stack software engineer</div>
        <div class="text-4xl">
          I like sunsets, coding, and peruvian cuisine.
        </div>
      </div>

      <div class="relative w-full h-full photo-container flex wrap gap-4">
        <img
          v-for="(photo, i) in photos"
          :key="photo.src"
          :src="photo.src"
          :id="`img${i}`"
          :class="[photo.class, 'top-0 rounded-md']"
          :style="{ transform: `rotate(${i % 2 ? '' : '-'}${10 + i * 10}deg)` }"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const config = useRuntimeConfig();
const photos = ref([
  { src: `${config.app.baseURL}jc.jpg`, class: "w-64 h-auto max-h-80" },
  { src: `${config.app.baseURL}sunset1.jpg`, class: "w-64 h-64" },
]);
onMounted(() => {
  photos.value.forEach((_, i) => {
    Draggable.create(`#img${i}`, {
      bounds: ".photo-container",
    });
  });
});
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
