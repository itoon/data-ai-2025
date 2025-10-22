// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/main.css"],
  app: {
    buildAssetsDir: "assets",
    head: {
      title: "Data AI Day x Spark Education",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "logo.png",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      lineLiffId: "2008296196-401JNyOe",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/icon", "nuxt-gtag"],
  gtag: {
    id: "G-E4ZVNNC4SN",
  },
});
