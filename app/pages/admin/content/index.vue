<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">
        内容管理
      </h1>
      <p class="text-gray-600">
        管理平台所有课程内容和学习资料
      </p>
    </div>

    <!-- 统计概览 -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <UCard>
        <div class="text-center">
          <p class="text-3xl font-bold text-primary-600">
            {{ stats.totalCourses }}
          </p>
          <p class="text-sm text-gray-600 mt-1">
            总课程数
          </p>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-600">
            {{ stats.publishedCourses }}
          </p>
          <p class="text-sm text-gray-600 mt-1">
            已发布
          </p>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <p class="text-3xl font-bold text-orange-600">
            {{ stats.draftCourses }}
          </p>
          <p class="text-sm text-gray-600 mt-1">
            草稿
          </p>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-600">
            {{ stats.totalChapters }}
          </p>
          <p class="text-sm text-gray-600 mt-1">
            总章节数
          </p>
        </div>
      </UCard>
    </div>

    <!-- 筛选和操作栏 -->
    <UCard class="mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- 搜索框 -->
          <UInput
            v-model="searchQuery"
            placeholder="搜索课程名称..."
            icon="heroicons:magnifying-glass"
            size="md"
            class="w-64"
          />

          <!-- 分类筛选 -->
          <USelect
            v-model="filterCategory"
            :options="categoryOptions"
            placeholder="所有分类"
            size="md"
            class="w-40"
          />

          <!-- 状态筛选 -->
          <USelect
            v-model="filterStatus"
            :options="statusOptions"
            placeholder="所有状态"
            size="md"
            class="w-40"
          />
        </div>

        <div class="flex items-center gap-2">
          <!-- 批量操作 -->
          <UButton
            v-if="selectedCourses.length > 0"
            color="error"
            variant="soft"
            size="md"
            @click="handleBatchDelete"
          >
            <UIcon
              name="heroicons:trash"
              class="mr-2"
            />
            批量删除 ({{ selectedCourses.length }})
          </UButton>

          <!-- 新建课程 -->
          <UButton
            to="/admin/courses/create"
            color="primary"
            size="md"
          >
            <UIcon
              name="heroicons:plus"
              class="mr-2"
            />
            新建课程
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- 课程列表 -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            课程列表
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">
              共 {{ filteredCourses.length }} 门课程
            </span>
            <UButton
              icon="heroicons:arrow-path"
              size="sm"
              color="neutral"
              variant="ghost"
              :loading="refreshing"
              @click="handleRefresh"
            />
          </div>
        </div>
      </template>

      <!-- 空状态 -->
      <div
        v-if="filteredCourses.length === 0"
        class="text-center py-16"
      >
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <UIcon
            name="heroicons:document"
            class="text-4xl text-gray-400"
          />
        </div>
        <p class="text-gray-500 mb-2">
          {{ searchQuery || filterCategory || filterStatus ? '未找到匹配的课程' : '暂无课程内容' }}
        </p>
        <p class="text-sm text-gray-400 mb-4">
          {{ searchQuery || filterCategory || filterStatus ? '请尝试其他搜索条件' : '点击右上角"新建课程"开始创建' }}
        </p>
        <UButton
          v-if="!searchQuery && !filterCategory && !filterStatus"
          to="/admin/courses/create"
          color="primary"
        >
          <UIcon
            name="heroicons:plus"
            class="mr-2"
          />
          创建第一个课程
        </UButton>
      </div>

      <!-- 课程表格 -->
      <div
        v-else
        class="overflow-x-auto"
      >
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left p-4 font-semibold text-gray-700 w-12">
                <UCheckbox
                  :model-value="isAllSelected"
                  :indeterminate="isSomeSelected"
                  @update:model-value="toggleSelectAll"
                />
              </th>
              <th class="text-left p-4 font-semibold text-gray-700">
                课程信息
              </th>
              <th class="text-left p-4 font-semibold text-gray-700">
                分类
              </th>
              <th class="text-left p-4 font-semibold text-gray-700">
                章节数
              </th>
              <th class="text-left p-4 font-semibold text-gray-700">
                状态
              </th>
              <th class="text-left p-4 font-semibold text-gray-700">
                更新时间
              </th>
              <th class="text-left p-4 font-semibold text-gray-700 text-right">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="course in filteredCourses"
              :key="course.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="p-4">
                <UCheckbox
                  :model-value="selectedCourses.includes(course.id)"
                  @update:model-value="() => toggleCourseSelection(course.id)"
                />
              </td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {{ course.title.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">
                      {{ course.title }}
                    </p>
                    <p class="text-sm text-gray-500 line-clamp-1">
                      {{ course.description }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ course.category }}
                </span>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-1 text-gray-600">
                  <UIcon
                    name="heroicons:document-text"
                    class="text-sm"
                  />
                  <span>{{ course.chapterCount }} 章</span>
                </div>
              </td>
              <td class="p-4">
                <UBadge
                  :color="course.status === 'published' ? 'primary' : 'neutral'"
                  variant="subtle"
                >
                  {{ course.status === 'published' ? '已发布' : '草稿' }}
                </UBadge>
              </td>
              <td class="p-4 text-gray-600 text-sm">
                {{ formatDate(course.updatedAt) }}
              </td>
              <td class="p-4">
                <div class="flex items-center justify-end gap-1">
                  <UButton
                    icon="heroicons:pencil"
                    size="sm"
                    color="neutral"
                    variant="ghost"
                    :to="`/admin/courses/${course.id}/edit`"
                  >
                    编辑
                  </UButton>
                  <UButton
                    icon="heroicons:eye"
                    size="sm"
                    color="neutral"
                    variant="ghost"
                    :to="`/courses/${course.id}`"
                    target="_blank"
                  >
                    预览
                  </UButton>
                  <UButton
                    icon="heroicons:trash"
                    size="sm"
                    color="error"
                    variant="ghost"
                    @click="handleDelete(course)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <template
        v-if="filteredCourses.length > 0"
        #footer
      >
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            显示 1-{{ Math.min(10, filteredCourses.length) }} 共 {{ filteredCourses.length }} 门课程
          </p>
          <div class="flex items-center gap-2">
            <UButton
              icon="heroicons:chevron-left"
              size="sm"
              color="neutral"
              variant="outline"
              :disabled="currentPage === 1"
            >
              上一页
            </UButton>
            <UButton
              icon="heroicons:chevron-right"
              size="sm"
              color="neutral"
              variant="outline"
              trailing
              :disabled="currentPage >= totalPages"
            >
              下一页
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// 模拟数据
const courses = ref([
  {
    id: '1',
    title: '遥感影像基础入门',
    description: '学习遥感影像的基本概念和原理',
    category: '遥感基础',
    chapterCount: 8,
    status: 'published',
    updatedAt: '2024-01-15T10:30:00'
  },
  {
    id: '2',
    title: '卫星影像解译技术',
    description: '掌握卫星影像的解译方法和技巧',
    category: '影像解译',
    chapterCount: 12,
    status: 'published',
    updatedAt: '2024-01-14T15:45:00'
  },
  {
    id: '3',
    title: '农业遥感应用',
    description: '遥感技术在农业领域的应用实践',
    category: '专题应用',
    chapterCount: 6,
    status: 'draft',
    updatedAt: '2024-01-13T09:20:00'
  },
  {
    id: '4',
    title: '城市规划遥感监测',
    description: '利用遥感技术进行城市规划监测',
    category: '案例分析',
    chapterCount: 10,
    status: 'published',
    updatedAt: '2024-01-12T14:15:00'
  },
  {
    id: '5',
    title: '遥感影像处理进阶',
    description: '深入学习遥感影像的高级处理技术',
    category: '影像解译',
    chapterCount: 0,
    status: 'draft',
    updatedAt: '2024-01-11T11:00:00'
  }
])

// 统计数据
const stats = computed(() => ({
  totalCourses: courses.value.length,
  publishedCourses: courses.value.filter(c => c.status === 'published').length,
  draftCourses: courses.value.filter(c => c.status === 'draft').length,
  totalChapters: courses.value.reduce((sum, c) => sum + c.chapterCount, 0)
}))

// 筛选选项
const categoryOptions = [
  { label: '所有分类', value: '' },
  { label: '遥感基础', value: '遥感基础' },
  { label: '影像解译', value: '影像解译' },
  { label: '专题应用', value: '专题应用' },
  { label: '案例分析', value: '案例分析' }
]

const statusOptions = [
  { label: '所有状态', value: '' },
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' }
]

// 筛选状态
const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const selectedCourses = ref<string[]>([])
const refreshing = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

// 筛选后的课程
const filteredCourses = computed(() => {
  let result = courses.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(course =>
      course.title.toLowerCase().includes(query)
      || course.description.toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (filterCategory.value) {
    result = result.filter(course => course.category === filterCategory.value)
  }

  // 状态过滤
  if (filterStatus.value) {
    result = result.filter(course => course.status === filterStatus.value)
  }

  return result
})

// 全选状态
const isAllSelected = computed(() =>
  filteredCourses.value.length > 0
  && selectedCourses.value.length === filteredCourses.value.length
)

const isSomeSelected = computed(() =>
  selectedCourses.value.length > 0
  && selectedCourses.value.length < filteredCourses.value.length
)

// 方法
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedCourses.value = []
  } else {
    selectedCourses.value = filteredCourses.value.map(c => c.id)
  }
}

const toggleCourseSelection = (id: string) => {
  const index = selectedCourses.value.indexOf(id)
  if (index > -1) {
    selectedCourses.value.splice(index, 1)
  } else {
    selectedCourses.value.push(id)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDelete = (course: any) => {
  if (confirm(`确定要删除课程"${course.title}"吗？此操作不可恢复。`)) {
    const index = courses.value.findIndex(c => c.id === course.id)
    if (index > -1) {
      courses.value.splice(index, 1)
    }
  }
}

const handleBatchDelete = () => {
  if (confirm(`确定要删除选中的 ${selectedCourses.value.length} 门课程吗？此操作不可恢复。`)) {
    courses.value = courses.value.filter(c => !selectedCourses.value.includes(c.id))
    selectedCourses.value = []
  }
}

const handleRefresh = async () => {
  refreshing.value = true
  // 模拟刷新
  await new Promise(resolve => setTimeout(resolve, 1000))
  refreshing.value = false
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days} 天前`
  if (days < 30) return `${Math.floor(days / 7)} 周前`
  if (days < 365) return `${Math.floor(days / 30)} 个月前`
  return `${Math.floor(days / 365)} 年前`
}
</script>
