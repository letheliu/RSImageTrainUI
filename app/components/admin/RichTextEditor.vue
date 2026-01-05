<template>
  <div class="border rounded-md p-2">
    <div class="flex gap-2 mb-2">
      <UButton
        size="sm"
        @click="editor ? editor.chain().focus().toggleBold().run() : null"
      >
        <UIcon
          name="heroicons:bold"
          class="mr-1"
        /> 加粗
      </UButton>
      <UButton
        size="sm"
        @click="editor ? editor.chain().focus().toggleItalic().run() : null"
      >
        <UIcon
          name="heroicons:italic"
          class="mr-1"
        /> 斜体
      </UButton>
      <UButton
        size="sm"
        @click="editor ? editor.chain().focus().setHeading({ level: 2 }).run() : null"
      >
        <UIcon
          name="heroicons:type-h2"
          class="mr-1"
        /> 标题2
      </UButton>
    </div>
    <editor-content
      :editor="editor"
      class="min-h-[300px]"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'

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
    Heading,
    Bold,
    Italic
  ],
  content: props.content,
  onUpdate: ({ editor }) => {
    // 实时同步内容到父组件
    emit('update:content', editor.getHTML())
  }
})
</script>
