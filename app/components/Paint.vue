<template>
  <div class="flex relative flex-wrap min-w-[300px] max-w-[800px]">
    <div class="flex w-full justify-center relative" id="sky">
      <RoughBox
        :roughness="8"
        fillStyle="solid"
        fill="#F05E23"
        stroke="#F05E23"
        class="w-full h-full absolute inset-0 top-0"
      />

      <div class="flex absolute right-0 z-10">
        <div class="w-[100px] h-[100px]" v-for="_ in [1, 2]">
          <ClientOnly>
            <Blink>
              <template #first>
                <img src="~/assets/svg/bird1.svg" class="w-full h-full" />
              </template>
              <template #second>
                <img src="~/assets/svg/bird2.svg" class="w-full h-full" />
              </template>
            </Blink>
            <Blink :delay="800">
              <template #first>
                <img src="~/assets/svg/bird1.svg" class="w-full h-full" />
              </template>
              <template #second>
                <img src="~/assets/svg/bird2.svg" class="w-full h-full" />
              </template>
            </Blink>
          </ClientOnly>
        </div>
      </div>
      <div class="flex absolute left-0 z-10">
        <div class="w-[100px] h-[100px]" v-for="_ in [1, 2]">
          <ClientOnly>
            <Blink>
              <template #first>
                <img src="~/assets/svg/bird1.svg" class="w-full h-full" />
              </template>
              <template #second>
                <img src="~/assets/svg/bird2.svg" class="w-full h-full" />
              </template>
            </Blink>
            <Blink :delay="800">
              <template #first>
                <img src="~/assets/svg/bird1.svg" class="w-full h-full" />
              </template>
              <template #second>
                <img src="~/assets/svg/bird2.svg" class="w-full h-full" />
              </template>
            </Blink>
          </ClientOnly>
        </div>
      </div>
      <div class="w-[180px] h-[180px] p-4 relative z-10">
        <RoughCircle stroke="#EC6426" />
      </div>
    </div>
    <div class="flex gap-8 relative" id="sea">
      <RoughBox
        :roughness="8"
        fillStyle="solid"
        fill="#ACE6FF"
        stroke="#ACE6FF"
        class="w-full h-full absolute inset-0 top-0"
      />

      <div class="flex-1" v-for="i in [1, 2]">
        <ClientOnly>
          <Blink>
            <template #first>
              <img src="~/assets/svg/wave.svg" class="w-full" />
            </template>
            <template #second>
              <img src="~/assets/svg/wave2.svg" class="w-full" />
            </template>
          </Blink>
        </ClientOnly>
        <ClientOnly>
          <Blink>
            <template #first>
              <img src="~/assets/svg/wave2.svg" class="w-full" />
            </template>
            <template #second>
              <img src="~/assets/svg/wave.svg" class="w-full" />
            </template>
          </Blink>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
