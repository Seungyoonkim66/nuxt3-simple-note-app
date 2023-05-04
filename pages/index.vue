<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="default-content">

    <NuxtLink to="#">
      <PlusIcon class="default-content__icon"/>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.default-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  &__icon {
    width: 5rem;
    color: var(--text-color);
    opacity: 0.3;
    transition: opacity .2s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

