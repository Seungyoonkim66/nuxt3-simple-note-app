<script setup lang="ts">
function submit(form: {title: string, content: string}) {
  console.debug(form);
}
</script>

<template>
  <NoteForm
    @submit="submit"
  />
</template>