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

      <!-- <div class="flex wrap gap-4"> -->
      <!--   <PhotoBox class="relative w-[300px] h-[300px]"> -->
      <!--     <div class="top-0 absolute"> -->
      <!--       <img -->
      <!--         v-for="(src, i) in ['jc.jpg', 'sunset1.jpg']" -->
      <!--         :src="src" -->
      <!--         class="absolute top-0 w-64 h-64 rounded-md" -->
      <!--         :class="[`rotate-[${10 + i * 10}deg]`]" -->
      <!--       /> -->
      <!--     </div> -->
      <!--   </PhotoBox> -->
      <!-- </div> -->
      <div class="relative w-full h-full photo-container flex gap-4">
        <NuxtImg
          v-for="(src, i) in photos"
          :key="src"
          :src="src"
          :id="`img${i}`"
          class="top-0 w-64 h-auto max-h-80 rounded-md"
          :style="{ transform: `${i % 2 ? '' : '-'}rotate(${10 + i * 10}deg)` }"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const photos = ref(["jc.jpg", "sunset1.jpg"]);
onMounted(() => {
  photos.value.forEach((photo, i) => {
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
