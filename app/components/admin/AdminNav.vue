<template>
  <div class="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
    <!-- Logo / 标题 -->
    <div class="p-6 border-b border-gray-700">
      <h1 class="text-xl font-bold flex items-center gap-2">
        <UIcon
          name="heroicons:academic-cap"
          class="text-2xl text-primary-400"
        />
        遥影智训
      </h1>
      <p class="text-sm text-gray-400 mt-1">
        管理员中心
      </p>
    </div>

    <!-- 导航菜单 -->
    <nav class="p-4">
      <ul class="space-y-1">
        <!-- 后台首页 -->
        <li>
          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive('/admin') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-800'"
          >
            <UIcon
              name="heroicons:home"
              class="text-xl"
            />
            <span class="font-medium">后台首页</span>
          </NuxtLink>
        </li>

        <!-- 课程管理 -->
        <li>
          <div class="flex items-center justify-between px-4 py-3 text-gray-400 font-medium">
            <span class="flex items-center gap-3">
              <UIcon
                name="heroicons:book-open"
                class="text-xl"
              />
              课程管理
            </span>
            <UIcon
              :name="isCoursesMenuOpen ? 'heroicons:chevron-down' : 'heroicons:chevron-right'"
              class="text-sm cursor-pointer hover:text-white transition-colors"
              @click="isCoursesMenuOpen = !isCoursesMenuOpen"
            />
          </div>
          <transition
            enter-active-class="transition-all duration-200"
            leave-active-class="transition-all duration-200"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <ul
              v-show="isCoursesMenuOpen"
              class="ml-8 mt-1 space-y-1"
            >
              <li>
                <NuxtLink
                  to="/admin/courses"
                  class="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm"
                  :class="isActive('/admin/courses') && !isSubRoute('/admin/courses/create') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
                >
                  <UIcon
                    name="heroicons:list-bullet"
                    class="text-lg"
                  />
                  <span>课程列表</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/admin/courses/create"
                  class="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm"
                  :class="isActive('/admin/courses/create') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
                >
                  <UIcon
                    name="heroicons:plus-circle"
                    class="text-lg"
                  />
                  <span>创建课程</span>
                </NuxtLink>
              </li>
            </ul>
          </transition>
        </li>

        <!-- 内容管理 -->
        <li>
          <NuxtLink
            to="/admin/content"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive('/admin/content') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-800'"
          >
            <UIcon
              name="heroicons:pencil-square"
              class="text-xl"
            />
            <span class="font-medium">内容管理</span>
          </NuxtLink>
        </li>

        <!-- 用户管理 -->
        <li>
          <NuxtLink
            to="/admin/users"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive('/admin/users') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-800'"
          >
            <UIcon
              name="heroicons:users"
              class="text-xl"
            />
            <span class="font-medium">用户管理</span>
          </NuxtLink>
        </li>

        <!-- 数据统计 -->
        <li>
          <NuxtLink
            to="/admin/analytics"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive('/admin/analytics') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-800'"
          >
            <UIcon
              name="heroicons:chart-bar"
              class="text-xl"
            />
            <span class="font-medium">数据统计</span>
          </NuxtLink>
        </li>

        <!-- 系统设置 -->
        <li>
          <NuxtLink
            to="/admin/settings"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive('/admin/settings') ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-800'"
          >
            <UIcon
              name="heroicons:cog-6-tooth"
              class="text-xl"
            />
            <span class="font-medium">系统设置</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- 分隔线 -->
      <div class="my-6 border-t border-gray-700" />

      <!-- 返回前台 -->
      <ul class="space-y-1">
        <li>
          <NuxtLink
            to="/"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <UIcon
              name="heroicons:arrow-left"
              class="text-xl"
            />
            <span class="font-medium">返回前台</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 课程管理子菜单展开状态
const isCoursesMenuOpen = ref(true)

// 判断当前路由是否激活
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// 判断是否是子路由
const isSubRoute = (path: string) => {
  return route.path.startsWith(path)
}

// 根据当前路由自动展开课程菜单
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/admin/courses')) {
    isCoursesMenuOpen.value = true
  }
}, { immediate: true })
</script>

<style scoped>
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
