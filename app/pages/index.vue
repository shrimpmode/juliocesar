<template>
  <div class="bg-cream h-screen text-primary relative">
    <RoughBox
      :roughness="4"
      :stroke-width="2.5"
      class="w-full h-full absolute inset-0"
    />
    <main class="p-8 relative z-10">
      <div class="pb-8">
        <div class="text-6xl">Hi ! I'm Julio Cesar</div>
        <div class="text-4xl">I'm a full stack software engineer</div>
        <div class="text-4xl">I like sunsets, coding, and cuisine.</div>
      </div>

      <Paint />
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
