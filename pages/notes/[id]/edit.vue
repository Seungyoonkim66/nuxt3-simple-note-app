<script setup lang="ts">
import type { Note } from '@/types/note.type';

const { trigger } = useReloadSignal();
const noteId = Number(useRoute().params.id);

const { data } = await useFetchApi<Note>(`/api/v1/notes/${noteId}`)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Note not found'
  });
}

const note = data.value.data;

async function submit(form: { title: string; content: string; }) {
  const { data } = await $fetchApi<Note>(`/api/v1/notes/${noteId}`, {
    method: 'PUT',
    body: form
  });

  trigger();
  // TODO: zod로 400 에러 처리
  navigateTo(`/notes/${data.id}`);
}

</script>

<template>
  <NoteForm
    :title="note.title"
    :content="note.content"
    @submit="form => submit(form)"
  />
</template>

<style lang="scss" scoped>
</style>
