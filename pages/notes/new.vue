<script setup lang="ts">
import type { Note } from '@/types/note.type';
import type { Response } from '@/types/response.type';

const route = useRoute();
const config = useRuntimeConfig(); // nuxt.config.js에 접근하기 위해 

const id = computed(() => route.params.id);
const apiUrl = config.public.apiUrl;

async function submit(form: {title: string, content: string}) {
  const { data } = await $fetch<Response<Note>>(`${apiUrl}/api/v1/notes`, {
    method: 'POST',
    body: {
      title: form.title,
      content: form.content
    }
  });

  navigateTo(`/notes/${data.id}`)
}
</script>

<template>
  <NoteForm
    @submit="submit"
  />
</template>