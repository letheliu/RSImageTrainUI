// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],

  ssr: false,

  devtools: {
    enabled: true
  },
  app: {
    head: {
      title: '遥感图像训练平台',
      meta: [
        { name: 'description', content: '遥感图像训练平台' }
      ],
      link: [
        // 替换为阿里镜像的 Material Symbols
        {
          rel: 'stylesheet',
          href: 'https://gw.alicdn.com/imgextra/i4/O1CN01xQLU0g1F85ZtX9X95_!!6000000000501-2-fonts/Inter.css' // 基础字体
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.cn/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' // 国内可访问的 Google 镜像
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: false
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
