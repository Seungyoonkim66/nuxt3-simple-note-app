<script setup lang="ts">
</script>

<template>
  <button class="sidebar-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.sidebar-button {
  display: block;
  width: 100%;
  border:none;
  background: none;
  background-color: var(--primary-color);
  color: white;
  padding: .9375rem;
  font-weight: 500;
  transition: background-color .2s;

  &:hover {
    background-color: var(--primary-color-dark);
  }
}
</style>
