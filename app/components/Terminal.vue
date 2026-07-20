<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const commands = [
  { input: "./skills.sh", output: "" },
  { input: "", output: "Python, Javascript, Go" },
  { input: "", output: "Django, Vue, React, Nuxt" },
];

onMounted(() => {
  const tl = gsap.timeline();

  commands.forEach((_, i) => {
    const split = SplitText.create(`.input-${i}`, { type: "chars" });

    gsap.set(split.chars, { opacity: 0 });
    gsap.set(`.output-${i}`, { autoAlpha: 0 });
    if (i > 0) gsap.set(`.cmd-${i}`, { autoAlpha: 0 });

    if (i > 0) tl.to(`.cmd-${i}`, { autoAlpha: 1, delay: 0.2 });

    tl.to(split.chars, { opacity: 1, duration: 0, stagger: 0.05 }).to(
      `.output-${i}`,
      { autoAlpha: 1, delay: 0.15 },
    );
  });
});
</script>

<template>
  <div
    class="bg-[#232136] text-neutral-100 text-4xl h-full rounded-md py-8 px-4"
  >
    <div class="p-2 mb-4">
      <div class="flex gap-4">
        <div class="w-8 h-8 bg-[#eb6f92] rounded-full"></div>
        <div class="w-8 h-8 bg-[#f6c177] rounded-full"></div>
        <div class="w-8 h-8 bg-[#9ccfd8] rounded-full"></div>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-4">
      <div v-for="(cmd, i) in commands" :key="i" :class="`cmd-${i}`">
        <div class="flex gap-4" v-if="cmd.input">
          $
          <div :class="`input-${i}`">{{ cmd.input }}</div>
        </div>
        <div :class="`output-${i}`">
          {{ cmd.output }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
