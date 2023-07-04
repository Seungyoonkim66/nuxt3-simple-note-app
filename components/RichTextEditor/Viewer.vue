<script setup lang="ts">

defineProps<{
  content: string;
}>();
</script>

<template>
   <div 
      class="rich-text-editor-viewer pretty-scrollbar"
      v-html="convertNewLine(content)"
    />
</template>

<style lang="scss" scoped>
.rich-text-editor-viewer {
  flex-grow: 1;
  overflow: auto;
  margin-right: -1.25rem;
  padding-right: 1.25rem;

  :deep(p) {
    margin: 0;
  }

  :deep(> * + *) {
    margin-top: 0.75em !important;
  }

  :deep(code) {
    font-size: 0.9em;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(97,97,97,.1);
    color: #616161;
    box-decoration-break: clone;
  }

  :deep(pre) {
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

  :deep(p:empty::after) {
    content: '\00A0';
  }
}
</style>
