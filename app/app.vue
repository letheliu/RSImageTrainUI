<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const title = '遥影智训'
const description = '图像判读训练平台'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <NuxtImg
            src="/images/logo.png"
            alt="logo"
            class="w-18 h-18"
          />
          <span class="text-2xl font-bold">{{ title }}</span>
          <span class="text-sm text-muted">卫星影像判读训练平台</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with SceleTech • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        客服联系方式：<span class="text-sm text-muted">18810000000</span>
      </template>
    </UFooter>
  </UApp>
</template>
