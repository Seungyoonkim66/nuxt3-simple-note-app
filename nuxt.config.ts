// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-snackbar'],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },
  css: [
    'assets/styles/normalize.css',
    'assets/styles/common.scss',
  ],
  runtimeConfig: {
    // 서버에서 쓸 때는 여기서 선언 
    supabaseUrl: process.env.NUXT_SUPABASE_URL,
    supabaseApiKey: process.env.NUXT_SUPABASE_KEY,
    public: { // 클라이언트에서 쓸 때는 여기서 선언
      apiUrl: process.env.NUXT_API_URL,
    }
  }
})
