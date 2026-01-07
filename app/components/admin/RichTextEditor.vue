<template>
  <div class="border rounded-md overflow-hidden">
    <!-- 工具栏 -->
    <div class="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
      <!-- 文本样式 -->
      <div class="flex gap-1 border-r pr-2 mr-1">
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('bold') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          <UIcon name="heroicons:bold" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('italic') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          <UIcon name="heroicons:italic" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('underline') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleUnderline().run()"
        >
          <UIcon name="heroicons:underline" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleStrike().run()"
        >
          <UIcon name="heroicons:squares-2x2" />
        </UButton>
      </div>

      <!-- 标题 -->
      <div class="flex gap-1 border-r pr-2 mr-1">
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('heading', { level: 1 }) ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('heading', { level: 2 }) ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('heading', { level: 3 }) ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </UButton>
      </div>

      <!-- 列表 -->
      <div class="flex gap-1 border-r pr-2 mr-1">
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('bulletList') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleBulletList().run()"
        >
          <UIcon name="heroicons:list-bullet" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('orderedList') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleOrderedList().run()"
        >
          <UIcon name="heroicons:queue-list" />
        </UButton>
      </div>

      <!-- 其他功能 -->
      <div class="flex gap-1 border-r pr-2 mr-1">
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('blockquote') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleBlockquote().run()"
        >
          <UIcon name="heroicons:chat-bubble-left-ellipsis" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('codeBlock') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleCodeBlock().run()"
        >
          <UIcon name="heroicons:code" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          :color="editor?.isActive('code') ? 'primary' : 'neutral'"
          @click="editor?.chain().focus().toggleCode().run()"
        >
          &lt;/&gt;
        </UButton>
      </div>

      <!-- 撤销重做 -->
      <div class="flex gap-1">
        <UButton
          size="sm"
          variant="ghost"
          color="neutral"
          :disabled="!editor?.can().undo()"
          @click="editor?.chain().focus().undo().run()"
        >
          <UIcon name="heroicons:arrow-uturn-left" />
        </UButton>
        <UButton
          size="sm"
          variant="ghost"
          color="neutral"
          :disabled="!editor?.can().redo()"
          @click="editor?.chain().focus().redo().run()"
        >
          <UIcon name="heroicons:arrow-uturn-right" />
        </UButton>
      </div>
    </div>

    <!-- 编辑区域 -->
    <editor-content
      :editor="editor"
      class="prose-content max-w-none"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import Code from '@tiptap/extension-code'
import History from '@tiptap/extension-history'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:content'])

// 初始化编辑器
const editor = useEditor({
  extensions: [
    Document,
    Paragraph,
    Text,
    Heading.configure({
      levels: [1, 2, 3]
    }),
    Bold,
    Italic,
    Underline,
    Strike,
    BulletList,
    OrderedList,
    ListItem,
    Blockquote,
    CodeBlock,
    Code,
    History
  ],
  content: props.content,
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[300px] p-4'
    }
  },
  onUpdate: ({ editor }) => {
    // 实时同步内容到父组件
    emit('update:content', editor.getHTML())
  }
})

// 监听props变化，更新编辑器内容
watch(() => props.content, (newContent) => {
  if (editor.value && newContent !== editor.value.getHTML()) {
    editor.value.commands.setContent(newContent)
  }
})
</script>

<style>
/* 编辑器样式 */
.prose-content {
  background: white;
}

.prose-content :deep(.ProseMirror) {
  min-height: 300px;
  padding: 1rem;
}

.prose-content :deep(.ProseMirror:focus) {
  outline: none;
}

.prose-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.prose-content :deep(h1) {
  font-size: 2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.prose-content :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.prose-content :deep(h3) {
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.prose-content :deep(ul), .prose-content :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

.prose-content :deep(li) {
  margin-bottom: 0.25em;
}

.prose-content :deep(blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1em 0;
  color: #6b7280;
}

.prose-content :deep(pre) {
  background: #1f2937;
  color: #f3f4f6;
  padding: 1em;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin: 1em 0;
}

.prose-content :deep(code) {
  background: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.prose-content :deep(p) {
  margin-bottom: 0.75em;
  line-height: 1.7;
}
</style>
