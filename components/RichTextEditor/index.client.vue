<script setup lang="ts">
// js hydration이 없으면 의미 없기 때문에 client-only로 변경
import { onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', val: string):void;
}>();


const editor = useEditor({
  content: props.modelValue,
  onUpdate() {
    if (!editor.value) return;
    emits('update:modelValue', editor.value.getHTML());
  },
  extensions: [
    StarterKit,
  ],
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
})
</script>

<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.ProseMirror) {
  outline: none;
  height: 100%;
  width: 100%;

  p {
    margin: 0;
  }

  > * + * {
    margin-top: 0.75em !important;
  }

  code {
    font-size: 0.9em;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(97,97,97,.1);
    color: #616161;
    box-decoration-break: clone;
  }

  pre {
    background-color: #0d0d0d;
    color: #fff;
    font-family: 'monospace';
    padding: 0.75em;
    border-radius: 0.5em;

    code{
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8em;
    }
  }
}

</style>