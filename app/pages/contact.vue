<template>
  <div class="bg-dusk text-cream h-screen p-8 relative">
    <RoughBox
      :roughness="4"
      :stroke-width="2.5"
      class="w-full h-full absolute inset-0"
    />

    <div class="relative z-10 flex flex-col gap-6 max-w-4xl">
      <h1 class="text-6xl mb-4">Contact</h1>

      <div class="flex flex-col gap-4 text-3xl">
        <div class="flex flex-col gap-2">
          <span class="text-4xl font-semibold">Email</span>
          <a href="mailto:jcsile444@gmail.com" class="hover:underline">
            jcsile444@gmail.com
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-4xl font-semibold">GitHub</span>
          <a
            href="https://github.com/shrimpmode/juliocesar"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            This Project
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-4xl font-semibold">Resume</span>
          <a
            href="/juliocesar/Resume.pdf"
            target="_blank"
            class="hover:underline"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
