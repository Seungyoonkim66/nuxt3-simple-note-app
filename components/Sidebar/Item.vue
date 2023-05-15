<script setup lang="ts">
withDefaults(defineProps<{
  title?: string,
  preview?: string,
  active?: boolean,
}>(), {
  active: false,
  title: '제목 없음',
  preview: '내용 없음'
});
</script>

<template>
  <div :class="{
    'sidebar-item': true,
    'sidebar-item--active': active
  }">
    <h1 class="sidebar-item__title">
      {{ title }}
    </h1>

    <div class="sidebar-item__preview">
      {{ preview }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  padding: .625rem .9375rem;
  color: var(--text-color);

  &--active {
    color: var(--primary-color);
  }

  &__title {
    font-size: 1.125rem;
    margin-bottom: .3125rem;
  }

  &__preview {
    font-size: .875rem;
    overflow: hidden;
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    filter: opacity(0.7);
  }

}
</style>
