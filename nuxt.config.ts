// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/juliocesar/",
    pageTransition: { name: "page", mode: "out-in" },
  },
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: true },
  fonts: {
    families: [
      {
        name: "Indie Flower",
        provider: "google",
      },
    ],
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: "#484149",
            cream: "#F1DCBA",
            mint: "#BDD3CE",
            sage: "#DBDDB6",
            orange: "#EC6426",
            dusk: "#5b5f8d",
          },
          fontFamily: {
            sans: ['"Indie Flower"', "cursive"],
          },
        },
      },
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
  ],
});
