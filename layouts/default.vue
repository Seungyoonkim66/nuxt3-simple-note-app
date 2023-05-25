<script setup lang="ts">
import type { Note } from '@/types/note.type';
import type { Response } from '@/types/response.type';

const config = useRuntimeConfig(); // nuxt.config.js에 접근하기 위해 
const { signal } = useReloadSignal();

const apiUrl = config.public.apiUrl;

const noteId = computed(():number => Number(useRoute().params.id));


/* TODO: 리팩토링 composable로 만들기 */
const { data, refresh } = await useFetch<Response<Note[]>>(`${apiUrl}/api/v1/notes`);
/* TODO: useFetch가 반환하는 것: refresh, pending, error, execute 등... 알아보기 */

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Something went wrong'
  })
}

const notes = ref<Note[]>(data.value.data);

watch(signal, async () => {
  await refresh();

  if (!data.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    })
  }

  notes.value = data.value?.data;
});

</script>

<template>
  <div class="note">
    <div class="note__sidebar sidebar">
      <div class="sidebar__button-box">
        <NuxtLink to="/notes/new">
          <NoteButton>새로운 노트 추가</NoteButton>
        </NuxtLink>
      </div>
      <div class="sidebar__items pretty-scrollbar">

        <template 
          v-for="(note, index) in notes"
          :key="note.id"
        >
          <NuxtLink
            :to="`/notes/${note.id}`"
          >
            <SidebarItem 
              :title="note.title"
              :preview="note.teaser"
              :active="noteId === note.id"
            />
            <SidebarDivider v-if="index !== notes.length - 1"/>
          </NuxtLink>
        </template>

      </div>
    </div>
    <div class="note__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.note {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;

  &__sidebar {
    border-right: 1px solid var(--border-color);
  }

  &__content {
    padding: 1.25rem;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  overflow: auto;

  &__button-box {
    flex-shrink: 0;
  }

  &__items {
    flex-grow: 1;
    overflow: auto;
    scrollbar-gutter: stable;
  }
}
</style>
