<script setup lang="ts">
import type { Note } from '@/types/note.type';

const route = useRoute();

const { trigger } = useReloadSignal();

const noteId = computed(() => route.params.id);

/* 
  axois를 쓰면 안되는 이유
  1. 서버에서 한번 클라이언트에서 한번, 총 두번 호출하여 비효율적
  2. 서버에서 불러왔을 때랑 클라이언트에서 불러왔을 때랑 싱크가 안맞으면 에러 
  => 기본적으로 제공되는 useFetch 사용
*/

const { data } = await useFetchApi<Note>(`/api/v1/notes/${noteId.value}`);
/* 
  useFetch
  - 서버에서만 api 콜 한번 -> 랜더링 + 데이터 캐싱
  - 클라이언트에서 hydration할 때 캐싱된 데이터 사용
  - 즉, 서버에서 딱 한번만 api 콜하고 캐싱된 데이터 사용 
*/

if (!data.value) {
  throw createError({/* nuxt에서 기본으로 제공하는 것 */
    statusCode: 404,
    statusMessage: 'Note not found'
  })
}

const note = data.value.data;

async function deleteNote() {
  if (!confirm('정말 삭제하시겠습니까?')) return;

  $fetchApi<{ message: string }>(`/api/v1/notes/${noteId.value}`, {
    method: 'DELETE'
  });

  trigger();
  navigateTo('/');
}
</script>

<template>

  <div class="content">
    <div class="content__header">
      <h1 class="content__title">{{ note.title === '' ? '제목 없음' : note.title }}</h1>
      <div class="content__info">
        <!-- client-only: 
          * 서버쪽에서 만든 화면과 하이드레이션 된 이후에 화면이 달라지는 문제를 해결하기 위해 client 에서만 랜더링하는 것 
          * [fileName].client.vue 파일을 만들면 client-only로 감싼 효과를 가진 파일이 있다. -> TODO: fallback은 어떻게 처리하는지 알아보기 
         -->
        <ClientOnly fallback="loading...">
          <!-- <template #fallback> 이렇게도 쓸 수 있다. </template> -->
          <span>최근 수정 시간: {{  humanize(note.updated_at) }}</span>
        </ClientOnly>
        <span>조회수: {{ note.views }}</span>
        <NuxtLink 
          :to="`/notes/${note.id}/edit`"
          class="content__btn"
        >수정</NuxtLink>
        <button 
          type="button" 
          class="content__btn"
          @click="deleteNote"
        >삭제</button>
      </div>
    </div>

    <div 
      class="content__body pretty-scrollbar"
      v-html="convertNewLine(note.content)"
    />

  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  max-height: calc(100vh - 1.25rem * 2);
  display: flex;
  flex-direction: column;

  &__header {
    margin-bottom: 2.5rem;
  }

  &__title {
    font-size: 2.5rem;
    margin: 0;
    margin-bottom: .625rem;
  }

  &__info {
    font-size: 1rem;
    color: var(--text-color-light);
    display: flex;
    column-gap: .8rem;
    font-weight: 300;
    align-items: center;
  }

  &__btn {
    border: none;
    background: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font-weight: inherit;
    appearance: none;

    &:hover {
      text-decoration: underline;
    }
  }


  &__body {
    flex-grow: 1;
    overflow: auto;
    margin-right: -1.25rem;
    padding-right: 1.25rem;
  }
}
</style>
