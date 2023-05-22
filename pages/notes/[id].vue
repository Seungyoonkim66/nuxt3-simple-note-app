<script setup lang="ts">
type Response<T> = {
  data: T,
}
type Note = {
  id: number;
  title: string;
  content: string;
  teaser: string;
  views: number;
  created_at: Date;
  updated_at: Date;
}
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

  <div>
    <div>
      <h1>{{ note.title }}</h1>
    </div>

    <div>
      <span>Updated at {{  note.updated_at }}</span>
      <span>Views: {{ note.views }}</span>
    </div>

    <div v-html="note.content"/>

  </div>
</template>

<style lang="scss" scoped>
</style>
