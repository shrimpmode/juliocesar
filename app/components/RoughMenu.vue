<template>
  <button
    type="button"
    :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    :aria-expanded="isOpen"
    class="bg-transparent border-0 cursor-pointer p-2 inline-flex items-center justify-center rounded hover:bg-black/5 active:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    @click="isOpen = !isOpen"
  >
    <img
      :src="`${baseURL}${isOpen ? 'close.svg' : 'menu.svg'}`"
      alt=""
      aria-hidden="true"
      class="w-8 h-8"
    />
  </button>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false });
const baseURL = useRuntimeConfig().app.baseURL;
</script>
