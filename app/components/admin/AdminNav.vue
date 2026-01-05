<template>
  <div class="bg-gray-800 text-white h-screen w-64 fixed">
    <div class="p-4 text-xl font-bold">
      遥影智训-管理员中心
    </div>
    <UNavigation
      :items="navItems"
      class="px-2"
    />
  </div>
</template>

<script setup lang="ts">
const navItems = [
  {
    label: '后台首页',
    icon: 'heroicons:home',
    to: '/admin'
  },
  {
    label: '课程管理',
    icon: 'heroicons:book-open',
    to: '/admin/courses'
  },
  {
    label: '内容管理',
    icon: 'heroicons:pencil-square',
    to: '/admin/content'
  }
]
</script>
