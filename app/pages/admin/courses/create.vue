<template>
  <div class="flex">
    <!-- 侧边导航 -->
    <AdminNav />
    <!-- 主内容区 -->
    <div class="ml-64 p-8 w-full">
      <h1 class="text-2xl font-bold mb-6">
        创建新课程
      </h1>
      <UCard class="p-6">
        <UForm @submit="handleSubmit">
          <!-- 课程基本信息 -->
          <UFormGroup
            label="课程名称"
            class="mb-4"
          >
            <UInput
              v-model="course.name"
              required
            />
          </UFormGroup>
          <UFormGroup
            label="课程目录/分类"
            class="mb-4"
          >
            <USelect
              v-model="course.category"
              :options="categories"
              placeholder="选择分类"
            />
          </UFormGroup>
          <!-- 富文本课程介绍 -->
          <UFormGroup
            label="课程详情"
            class="mb-4"
          >
            <RichTextEditor v-model:content="course.content" />
          </UFormGroup>
          <UButton
            type="submit"
            color="primary"
          >
            保存课程
          </UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// 模拟分类数据（实际从数据库获取）
const categories = [
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '人工智能', value: 'ai' }
]

// 课程表单数据
const course = ref({
  name: '',
  category: '',
  content: ''
})

// 提交表单（实际对接数据库 API）
const handleSubmit = async () => {
  try {
    // 向后端API提交数据
    const response = await fetch('/api/course/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course.value)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || '网络请求失败')
    }

    const data = await response.json()
    alert('课程创建成功！课程ID：' + data.id)
    // 跳转到课程列表
    navigateTo('/admin/courses')
  } catch (err) {
    console.error('保存失败：', err)
    alert('创建失败，请重试')
  }
}
</script>
