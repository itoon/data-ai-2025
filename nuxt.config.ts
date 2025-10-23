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

  runtimeConfig: {
    public: {
      lineLiffId: process.env.NUXT_PUBLIC_LINE_LIFF_ID,
      firebaseConfig: {
        apiKey: process.env.NUXT_PUBLIC_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_APP_ID,
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/icon", "nuxt-gtag"],
  gtag: {
    id: "G-E4ZVNNC4SN",
  },
});
