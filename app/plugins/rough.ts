import rough from "roughjs";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      rough,
    },
  };
});
