// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/main.css"],
  app: {
    baseURL: "/data-ai-2025",
    buildAssetsDir: "assets",
    head: {
      title: "Data AI Day 2025",
      meta: [
        {
          name: "description",
          content:
            "คุณได้รับเลือกให้เข้าร่วมทีมพิเศษเพื่อปฏิบัติภารกิจที่ยิ่งใหญ่ที่สุดในประวัติศาสตร์ การสำรวจดาวเคราะห์ Data ที่ไร้แผนที่และไม่เคยมีใครย่างกรายไปถึง",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "/data-ai-2025/favicon.ico",
        },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/icon", "nuxt-gtag"],
  gtag: {
    id: "G-E4ZVNNC4SN",
  },
});
