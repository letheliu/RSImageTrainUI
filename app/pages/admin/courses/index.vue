<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        课程列表
      </h1>
      <UButton to="/admin/courses/create" color="primary">
        <UIcon name="heroicons:plus" class="mr-1" />
        创建新课程
      </UButton>
    </div>

    <!-- 课程列表 -->
    <UCard>
      <div class="text-center text-gray-500 py-10">
        <UIcon name="heroicons:book-open" class="mx-auto text-4xl mb-2" />
        <p>暂无课程，点击上方按钮创建第一个课程</p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
