<script setup lang="ts">
import type { Note } from '@/types/note.type';

const route = useRoute();

const { trigger } = useReloadSignal();

const id = computed(() => route.params.id);

async function submit(form: {title: string, content: string}) {
  /* 조회인 경우에는 useFetch를 쓰지만 데이터 변경이 있는 경우 fetch를 쓴다. */
  const { data } = await $fetchApi<Note>('/api/v1/notes', {
    method: 'POST',
    body: {
      title: form.title,
      content: form.content
    }
  });

  trigger();
  navigateTo(`/notes/${data.id}`);
}
</script>

<template>
  <NoteForm
    @submit="submit"
  />
</template>