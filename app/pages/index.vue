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

      <div class="w-64 h-64">
        <PhotoBox class="relative w-64 h-64">
          <img
            src="/sunset1.jpg"
            class="rotate-[10deg] absolute top-0 w-64 h-64"
          />
        </PhotoBox>
      </div>
    </main>
  </div>
</template>

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
