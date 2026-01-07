<template>
  <div>
    <!-- 顶部导航栏 -->
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
          <span class="text-2xl font-bold">遥影智训</span>
          <span class="text-sm text-muted">卫星影像判读训练平台</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <!-- 主内容区 -->
    <UMain>
      <slot />
    </UMain>

    <!-- 分隔线 -->
    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <!-- 页脚 -->
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
  </div>
</template>
