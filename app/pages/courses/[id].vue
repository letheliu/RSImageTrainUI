<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <UNavbar
      title="遥感影像判读学习平台"
      class="mb-4"
    >
      <UNavbarItem
        label="首页"
        to="/"
      />
      <UNavbarItem
        label="课程列表"
        to="/courses"
      />
    </UNavbar>

    <div class="container mx-auto px-4 flex gap-6">
      <!-- 左侧章节导航 -->
      <div class="w-64 shrink-0 bg-white rounded-lg shadow-sm p-4 h-[80vh] sticky top-4 overflow-auto">
        <h2 class="text-xl font-bold mb-4">
          {{ course?.name }}
        </h2>
        <UNavigation
          :items="chapterNavItems"
          class="space-y-1"
          active-class="bg-primary/10 text-primary"
        />
      </div>

      <!-- 右侧课程内容 -->
      <div class="flex-1 bg-white rounded-lg shadow-sm p-8">
        <!-- 章节标题 -->
        <h1 class="text-2xl font-bold mb-6">
          {{ currentChapter?.title || '请选择章节' }}
        </h1>

        <!-- 富文本内容渲染（处理 Tiptap 生成的 HTML） -->
        <div
          v-if="currentChapter?.content"
          class="prose max-w-none"
          v-html="currentChapter.content"
        />

        <!-- 空状态 -->
        <div
          v-else
          class="text-center text-gray-500 py-10"
        >
          <UIcon
            name="heroicons:book-open"
            class="mx-auto text-4xl mb-2"
          />
          <p>暂无章节内容，请选择左侧章节开始学习</p>
        </div>

        <!-- 章节切换按钮 -->
        <div class="flex justify-between mt-8">
          <UButton
            v-if="prevChapter"
            color="primary"
            variant="outline"
            @click="switchChapter(prevChapter.id)"
          >
            上一章：{{ prevChapter?.title }}
          </UButton>
          <UButton
            v-if="nextChapter"
            color="primary"
            @click="switchChapter(nextChapter.id)"
          >
            下一章：{{ nextChapter?.title }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Chapter = {
  id: string
  title: string
  content: string
}

// 初始化路由
const route = useRoute()
const router = useRouter()
const api = useApi()

// 核心数据
type Course = {
  id: string
  name: string
}
const course = ref<Course | null>(null) // 当前课程信息
const chapters = ref<Chapter[]>([]) // 当前课程的所有章节
const currentChapterId = ref('') // 当前选中的章节ID

// 获取路由参数
const courseId = route.params.id as string

// 1. 加载课程基本信息
const loadCourse = async () => {
  const { data, error } = await api.get(`/courses/info?courseId=${courseId}`)

  if (error) {
    console.error('加载课程失败：', error)
    alert('课程不存在或已删除')
    router.push('/courses')
    return
  }
  course.value = data
}

// 2. 加载课程章节
const loadChapters = async () => {
  const { data, error } = await api.get(`/courses/chapters?courseId=${courseId}`)

  if (error) {
    console.error('加载章节失败：', error)
    return
  }
  chapters.value = data

  // 默认选中第一个章节
  if (chapters.value.length > 0 && !currentChapterId.value) {
    currentChapterId.value = chapters.value[0]?.id || ''
    // 如果路由有章节参数，优先选中该章节
    if (route.query.chapterId) {
      currentChapterId.value = route.query.chapterId as string
    }
  }
}

// 3. 计算当前章节、上一章、下一章
const currentChapter = computed(() => {
  return chapters.value.find(chapter => chapter?.id === currentChapterId.value) || null
})

const chapterIndex = computed(() => {
  return chapters.value.findIndex(chapter => chapter?.id === currentChapterId.value)
})

const prevChapter = computed(() => {
  const index = chapterIndex.value
  return index > 0 ? chapters.value[index - 1] : null
})

const nextChapter = computed(() => {
  const index = chapterIndex.value
  return index < chapters.value.length - 1 ? chapters.value[index + 1] : null
})

// 4. 章节导航项（适配 Nuxt UI Navigation 组件）
const chapterNavItems = computed(() => {
  return chapters.value.map(chapter => ({
    label: chapter.title,
    onClick: () => switchChapter(chapter.id),
    active: chapter.id === currentChapterId.value,
    icon: 'heroicons:document-text'
  }))
})

// 5. 切换章节方法
const switchChapter = (chapterId: string) => {
  currentChapterId.value = chapterId
  // 更新路由参数（保留课程ID，添加章节ID）
  router.push({
    path: `/courses/${courseId}`,
    query: { chapterId }
  })
}

// 初始化加载数据
onMounted(async () => {
  await loadCourse()
  await loadChapters()
})
</script>

<style scoped>
/* 富文本内容样式优化 */
.prose {
  line-height: 1.8;
}
.prose h2, .prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
.prose p {
  margin-bottom: 1rem;
}
.prose code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
</style>
