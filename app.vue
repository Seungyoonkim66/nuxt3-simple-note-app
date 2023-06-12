<script setup lang="ts">
  function recoverFromError(error: any) {
    error.value = null;
  }
</script>

<template>
  <NuxtLayout>
    <NuxtErrorBoundary>
      <!-- error boundary: 에러 발생시 내부 컴포넌트가 재랜더링됨 / error throw된 걸 받아서 error 값이 있으면 error slot에 있는 걸 랜더링하고 없으면 default slot을 랜더링한다.  -->
      <NuxtLoadingIndicator color="#1a8bcd"/>
      <NuxtPage />

      <NuxtSnackbar />


      <template #error="{ error }">
        <div>
          <h1>{{ error.value.statusCode }}</h1>
          <p>{{ error.value.statusMessage }}</p>
          <button 
            type="button"
            @click="recoverFromError(error)"
          >
            되돌리기
          </button>
        </div>
      </template>

    </NuxtErrorBoundary>
  </NuxtLayout>
</template>
