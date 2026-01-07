<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">
        管理员中心
      </h1>
      <p class="text-gray-600">
        欢迎回来，管理员
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <UIcon name="heroicons:book-open" class="text-2xl text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">课程总数</p>
            <p class="text-2xl font-bold">12</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <UIcon name="heroicons:users" class="text-2xl text-green-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">用户总数</p>
            <p class="text-2xl font-bold">1,234</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-purple-100 rounded-lg">
            <UIcon name="heroicons:document-text" class="text-2xl text-purple-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">章节总数</p>
            <p class="text-2xl font-bold">48</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-orange-100 rounded-lg">
            <UIcon name="heroicons:arrow-path" class="text-2xl text-orange-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">今日访问</p>
            <p class="text-2xl font-bold">328</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 快捷操作 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">快捷操作</h2>
        </template>
        <div class="space-y-3">
          <NuxtLink to="/admin/courses/create">
            <UButton color="primary" variant="soft" class="w-full justify-start">
              <UIcon name="heroicons:plus-circle" class="mr-2" />
              创建新课程
            </UButton>
          </NuxtLink>
          <NuxtLink to="/admin/courses">
            <UButton color="neutral" variant="outline" class="w-full justify-start">
              <UIcon name="heroicons:list-bullet" class="mr-2" />
              管理课程列表
            </UButton>
          </NuxtLink>
          <NuxtLink to="/admin/users">
            <UButton color="neutral" variant="outline" class="w-full justify-start">
              <UIcon name="heroicons:users" class="mr-2" />
              管理用户
            </UButton>
          </NuxtLink>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">最新课程</h2>
        </template>
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
              {{ i }}
            </div>
            <div class="flex-1">
              <p class="font-medium">遥感影像基础课程 {{ i }}</p>
              <p class="text-sm text-gray-500">2024-01-{{ 10 + i }}</p>
            </div>
            <UButton size="sm" color="neutral" variant="ghost" to="/admin/courses">
              <UIcon name="heroicons:pencil" />
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
