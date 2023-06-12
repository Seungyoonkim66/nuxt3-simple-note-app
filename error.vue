<script setup>
const props = defineProps(['error']);

function goBackHome() {
  clearError({ redirect: '/ '});
}

</script>

<template>
  <div class="error-page">
    <div class="error-page__inner-container">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ error.statusMessage }}</p>

      <button
        type="button"
        class="error-page__reset-btn"
        @click="goBackHome"
      >
        Home
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  &__inner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1 {
      color: var(--primary-color);
      font-size: 4rem;
      margin-bottom: 0;
    }

    p {
      font-size: 1rem;
      color: var(--text-color);
    }
  }

  &__reset-btn {
    background: none;
    border: none;
    cursor: pointer;
    background-color: var(--primary-color);
    color: white;
    padding: .625rem 1.25rem;
  }
}
</style>
