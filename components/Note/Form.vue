<script setup lang="ts">
import { NoteSchema } from '@/types/note.type';
import { fromZodError } from 'zod-validation-error'; 

const snackbak = useSnackbar();

const props = withDefaults(defineProps<{
  title?:  string;
  content?: string;
}>(), {
  title: '',
  content: '',
});

const form = reactive({
  title: '',
  content: '',
});

const emits = defineEmits<{
  (e: 'submit', value: { title: string, content: string }):void;
}>();

watch(() => props.title, title => {
  form.title = title;
}, { immediate: true });

watch(() => props.content, content => {
  form.content = content;
}, { immediate: true });

function submit() {
  const parsedForm = NoteSchema.pick({
    title: true,
    content: true,
  }).safeParse(form);

  if (!parsedForm.success) {
    const formatted = fromZodError(parsedForm.error);

    snackbak.add({
      type: 'error',
      text: formatted.message,
    });

    return;
  }
  emits('submit', form);
}
</script>

<template>
  <form
    class="form"
    @submit.prevent="submit"
  >

    <NoteTitleField
      v-model="form.title"
    />

    <textarea 
      v-model="form.content"
      class="form__content pretty-scrollbar"
    />

    <div class="form__submit-wrapper">
      <NoteButton 
        class="form__submit"
        type="submit"
      >등록</NoteButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    border: none;
    outline: none;
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    font-weight: bold;
  }

  &__content {
    border: none;
    outline: none;
    font-size: 1rem;
    flex-grow: 1;
    resize: none;
    margin-bottom: 1rem;
    margin-right: -1.25rem;
    padding-right: 1.25rem;
    line-height: 1.4rem;
  }

  &__submit-wrapper {
    margin: 0 -1.25rem -1.25rem -1.25rem;
  }

  &__submit {
    // margin: 0;
    // margin-bottom: -1.25rem;
    // // margin: 0 -1.25rem -1.25rem -1.25rem;
  }
}
</style>
