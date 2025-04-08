<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import type { Message } from '@/common/types.ts';
import Markdown from '@/views/chatbot/components/Markdown.vue';

interface Props {
  messages: Message[];
}

const props = defineProps<Props>();
const messagesContainer = ref<HTMLElement>();

watch(() => props.messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}
</script>
<template>
  <div ref="messagesContainer" class="grow overflow-y-auto">
    <div v-for="(message, index) of props.messages" :key="index"
         :class="`flex mb-4 items-start rounded-xl ${message.role === 'user' ? 'bg-primary-blue/10' : ''}`">
      <div class="w-full">
        <Markdown v-if="message.role === 'assistant' && message.content" :content="message.content"/>
        <div v-else>{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
