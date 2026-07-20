<template>
  <div class="flex h-screen w-screen">
    <div class="lg:hidden fixed top-4 right-4 z-50">
      <RoughMenu v-model="isMenuOpen" />
    </div>

    <Transition name="menu">
      <div
        v-if="isMenuOpen"
        class="lg:hidden fixed inset-0 z-40 grid grid-cols-2 grid-rows-2 auto-rows-fr text-5xl font-semibold"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          class="flex items-center justify-center hover:scale-105 transition-all"
          :class="link.classes"
          :to="link.to"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </NuxtLink>
        <div class="h-full w-full bg-cream">
          <NavBlock />
        </div>
      </div>
    </Transition>

    <div class="w-full lg:flex-1 bg-neutral-50">
      <slot />
    </div>
    <div
      class="hidden lg:grid lg:flex-1 grid-cols-2 grid-rows-2 auto-rows-fr text-5xl font-semibold"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        class="flex items-center justify-center hover:scale-105 transition-all"
        :class="link.classes"
        :to="link.to"
      >
        {{ link.name }}
      </NuxtLink>
      <div class="h-full w-full">
        <NavBlock />
      </div>
    </div>
  </div>
</template>

<script setup>
const isMenuOpen = ref(false);

const links = ref([
  {
    name: "Home",
    to: "/",
    classes: ["bg-primary", "text-cream"],
  },
  {
    name: "Skills",
    to: "/skills",
    classes: ["bg-mint", "text-primary"],
  },
  {
    name: "Contact",
    to: "/contact",
    classes: ["bg-sage", "text-primary"],
  },
]);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* Mobile menu transitions */
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
