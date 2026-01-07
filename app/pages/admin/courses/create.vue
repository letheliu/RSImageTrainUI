<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">
      创建新课程
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧：课程基本信息 -->
      <UCard class="lg:col-span-1 h-fit sticky top-8">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="heroicons:information-circle" class="text-xl text-primary-500" />
            <h2 class="text-lg font-semibold">
              课程基本信息
            </h2>
          </div>
        </template>

        <UForm class="space-y-6" @submit="handleSubmit">
          <UFormField label="课程名称" name="courseName">
            <UInput
              v-model="course.name"
              placeholder="请输入课程名称"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="课程分类" name="courseCategory">
            <USelect
              v-model="course.category"
              :options="categories"
              placeholder="请选择课程分类"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="课程简介" name="courseDescription">
            <UTextarea
              v-model="course.description"
              placeholder="请简要描述课程内容、学习目标等"
              :rows="4"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="课程封面" name="courseCover">
            <UInput
              v-model="course.coverImage"
              placeholder="请输入封面图片URL"
              size="xl"
              icon="heroicons:photo"
              class="w-full"
            />
            <p class="text-xs text-gray-500 mt-2">
              建议尺寸：800x450px，支持JPG、PNG格式
            </p>
          </UFormField>

          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <UButton
              type="submit"
              color="primary"
              size="md"
              :loading="submitting"
            >
              <UIcon name="heroicons:check-circle" class="mr-2" />
              保存课程
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              to="/admin/courses"
            >
              取消
            </UButton>
          </div>
        </UForm>
      </UCard>

      <!-- 右侧：章节管理 -->
      <UCard class="lg:col-span-2">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="heroicons:book-open" class="text-xl text-primary-500" />
              <h2 class="text-lg font-semibold">
                课程章节
              </h2>
              <span class="text-sm text-gray-500 font-normal">
                ({{ chapters.length }} 章)
              </span>
            </div>
            <UButton size="md" color="primary" variant="soft" @click="addChapter">
              <UIcon name="heroicons:plus" class="mr-2" />
              添加章节
            </UButton>
          </div>
        </template>

        <!-- 章节列表 -->
        <div v-if="chapters.length === 0" class="text-center py-16">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
            <UIcon name="heroicons:document" class="text-4xl text-gray-400" />
          </div>
          <p class="text-gray-500 mb-2">
            暂无章节内容
          </p>
          <p class="text-sm text-gray-400">
            点击右上角"添加章节"按钮开始创建
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(chapter, index) in chapters"
            :key="chapter.id"
            class="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors bg-white shadow-sm"
          >
            <!-- 章节头部 -->
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border-b">
              <div class="flex items-center gap-3 flex-1">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">
                  {{ index + 1 }}
                </div>
                <UInput
                  v-model="chapter.title"
                  placeholder="请输入章节标题"
                  size="md"
                  class="flex-1 max-w-md"
                />
              </div>
              <div class="flex items-center gap-1 ml-4">
                <UButton
                  icon="heroicons:arrow-up"
                  size="sm"
                  color="neutral"
                  variant="ghost"
                  :disabled="index === 0"
                  @click="moveChapter(index, -1)"
                />
                <UButton
                  icon="heroicons:arrow-down"
                  size="sm"
                  color="neutral"
                  variant="ghost"
                  :disabled="index === chapters.length - 1"
                  @click="moveChapter(index, 1)"
                />
                <UButton
                  icon="heroicons:trash"
                  size="sm"
                  color="error"
                  variant="ghost"
                  @click="removeChapter(index)"
                />
              </div>
            </div>

            <!-- 章节内容编辑器 -->
            <div class="p-4 bg-white">
              <RichTextEditor v-model:content="chapter.content" />
            </div>
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

type Chapter = {
  id: string
  title: string
  content: string
}

// 模拟分类数据
const categories = [
  { label: '遥感基础', value: 'basics' },
  { label: '影像解译', value: 'interpretation' },
  { label: '专题应用', value: 'application' },
  { label: '案例分析', value: 'case-study' }
]

// 课程基本信息
const course = ref({
  name: '',
  category: '',
  description: '',
  coverImage: ''
})

// 章节数据
const chapters = ref<Chapter[]>([])
const submitting = ref(false)

// 生成唯一ID
const generateId = () => {
  return `chapter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 添加新章节
const addChapter = () => {
  chapters.value.push({
    id: generateId(),
    title: `新章节 ${chapters.value.length + 1}`,
    content: ''
  })
}

// 删除章节
const removeChapter = (index: number) => {
  if (confirm('确定要删除这个章节吗？')) {
    chapters.value.splice(index, 1)
    // 重新编号
    chapters.value.forEach((chapter, i) => {
      if (!chapter.title.includes('新章节')) {
        return
      }
      const match = chapter.title.match(/新章节 (\d+)/)
      if (match) {
        chapter.title = `新章节 ${i + 1}`
      }
    })
  }
}

// 移动章节顺序
const moveChapter = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= chapters.value.length) return

  const temp: Chapter = chapters.value[index] as Chapter
  if (!temp) return
  chapters.value[index] = chapters.value[newIndex] as Chapter
  chapters.value[newIndex] = temp
}

// 提交表单
const handleSubmit = async () => {
  // 表单验证
  if (!course.value.name.trim()) {
    alert('请输入课程名称')
    return
  }
  if (!course.value.category) {
    alert('请选择课程分类')
    return
  }
  if (chapters.value.length === 0) {
    alert('请至少添加一个章节')
    return
  }

  // 验证所有章节都有标题和内容
  for (let i = 0; i < chapters.value.length; i++) {
    const chapter = chapters.value[i]
    if (chapter && !chapter.title.trim()) {
      alert(`第 ${i + 1} 章缺少标题`)
      return
    }
    if (chapter && !chapter.content.trim()) {
      alert(`第 ${i + 1} 章【${chapter.title}】缺少内容`)
      return
    }
  }

  submitting.value = true

  try {
    const response = await fetch('/api/course/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        course: course.value,
        chapters: chapters.value
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || '网络请求失败')
    }

    const data = await response.json()
    alert('课程创建成功！课程ID：' + data.id)
    navigateTo('/admin/courses')
  } catch (err) {
    console.error('保存失败：', err)
    alert('创建失败，请重试')
  } finally {
    submitting.value = false
  }
}
</script>
