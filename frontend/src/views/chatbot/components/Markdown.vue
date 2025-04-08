<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

interface Props {
  content: string;
}

const props = defineProps<Props>();

const html = computed(() => {
  return marked.parse(props.content);
});
</script>
<template>
  <div class="h-full w-full markdown-container" v-html="html">
  </div>
</template>
<style lang="scss" scoped>
</style>
