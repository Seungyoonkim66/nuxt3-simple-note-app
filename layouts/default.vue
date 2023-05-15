<script setup lang="ts">
</script>

<template>
  <div class="note">
    <div class="note__sidebar sidebar">
      <div class="sidebar__button-box">
        <NoteButton>새로운 노트 추가</NoteButton>
      </div>
      <div class="sidebar__items pretty-scrollbar">
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
