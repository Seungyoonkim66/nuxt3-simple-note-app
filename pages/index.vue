<script setup lang="ts">
</script>

<template>
  <div class="note">
    <div class="note__sidebar">
      <SidebarButton>새로운 노트 추가</SidebarButton>
      <NuxtLink
        to="#"
      >
        <SidebarItem
          active
          title="hello world"
          preview="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, explicabo! At debitis, modi eveniet, esse laborum nihil doloremque nemo officiis obcaecati accusantium similique blanditiis maxime tempore dolore. Eaque, sed a!"
        />
      </NuxtLink>
      <SidebarDivider />

      <SidebarItem />
      <SidebarDivider />

      <SidebarItem />
      <SidebarDivider />

      <SidebarItem />
      <SidebarDivider />
      <SidebarItem />
    </div>
    <div class="note__content">
2
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

  }
}
</style>
