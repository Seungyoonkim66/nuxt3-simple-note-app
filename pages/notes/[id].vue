<script setup lang="ts">
import type { Note } from '@/types/note.type';
import type { Response } from '@/types/response.type';

const route = useRoute();
const config = useRuntimeConfig(); // nuxt.config.js에 접근하기 위해 

const id = computed(() => route.params.id);
const apiUrl = config.public.apiUrl;

/* 
  axois를 쓰면 안되는 이유
  1. 서버에서 한번 클라이언트에서 한번, 총 두번 호출하여 비효율적
  2. 서버에서 불러왔을 때랑 클라이언트에서 불러왔을 때랑 싱크가 안맞으면 에러 
  => 기본적으로 제공되는 useFetch 사용
*/

const { data } = await useFetch<Response<Note>>(`${apiUrl}/api/v1/notes/${id.value}`);
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
</script>

<template>

  <div class="content">
    <div class="content__header">
      <h1 class="content__title">{{ note.title }}</h1>
      <div class="content__info">
        <span>최근 수정 시간: {{  humanize(note.updated_at) }}</span>
        <span>조회수: {{ note.views }}</span>
        <NuxtLink class="content__btn">수정</NuxtLink>
        <button type="button" class="content__btn">삭제</button>
      </div>
    </div>

    <div 
      class="content__body pretty-scrollbar"
      v-html="note.content"
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
