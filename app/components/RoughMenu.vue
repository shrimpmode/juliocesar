<template>
  <button
    type="button"
    class="menu-button"
    :aria-label="modelValue ? 'Close menu' : 'Open menu'"
    :aria-expanded="modelValue"
    aria-controls="navigation-menu"
    @click="toggleMenu"
  >
    <img
      src="/menu.svg"
      alt=""
      aria-hidden="true"
      class="w-8 h-8"
      v-if="!modelValue"
    />
    <img src="/close.svg" alt="" aria-hidden="true" class="w-8 h-8" v-else />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [boolean];
}>();

function toggleMenu() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped>
.menu-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.menu-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-button:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
}

.menu-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
