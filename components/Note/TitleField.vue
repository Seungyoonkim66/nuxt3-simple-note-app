<script setup lang="ts">
const PLACEHOLDER:string = '제목없음';

const props = withDefaults(defineProps<{
  modelValue: string,
}>(), {
  modelValue: '',
});

const titleField = ref<HTMLDivElement | null>(null);

const isPlaceholderShown = computed(():boolean => props.modelValue === '');

const emits = defineEmits<{
  (e: 'update:modelValue', value:string):void,
}>();

function onKeyup(e: KeyboardEvent) {
  const target = e.target as HTMLDivElement;
  emits('update:modelValue', target.innerText);
}

function onFocus() {
  if (!titleField.value) return;

  if (isPlaceholderShown.value) {
    titleField.value.innerText = '';
  }
}

function onBlur() {
  if (!titleField.value) return;

  if (isPlaceholderShown.value) {
    titleField.value.innerText = PLACEHOLDER;
  }
}

onMounted(() => {
  if (titleField.value) {
    titleField.value.innerText = props.modelValue || PLACEHOLDER;
  }
});
</script>

<template>
  <div
    :class="{
      'note-title-field': true,
      'note-title-field--placeholder': isPlaceholderShown,
    }"
    ref="titleField"
    contenteditable
    @keyup="onKeyup"
    @keypress.enter.prevent
    @focus="onFocus"
    @blur="onBlur"
  ></div>
</template>

<style lang="scss" scoped>
.note-title-field {
  outline: none;
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  font-weight: bold;
  max-width: 100%;
  word-break: break-all;

  &--placeholder {
    color: var(--text-color-lighter);
  }
}
</style>
