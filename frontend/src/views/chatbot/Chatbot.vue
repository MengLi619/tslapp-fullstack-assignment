<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import type { Message } from '@/common/types.ts';
import ChatInput from '@/views/chatbot/components/ChatInput.vue';
import ChatMessages from '@/views/chatbot/components/ChatMessages.vue';
import { EventSourceParserStream } from 'eventsource-parser/stream';
import { completion, createChat } from '@/services/ChatService.ts';
import { notNull } from '@/common/utils.ts';
import type { EventSourceMessage } from 'eventsource-parser';

interface State {
  messages: Message[];
  chatId?: string;
}

const state = reactive<State>({
  messages: [],
});

onMounted(async () => {
  state.chatId = (await createChat()).id;
});

async function* parseSSEStream(stream: ReadableStream): AsyncIterable<{ event: string; data: string; }> {
  const sseStream = stream
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new EventSourceParserStream()) as unknown as AsyncIterable<EventSourceMessage>;
  for await (const event of sseStream) {
    yield { event: event.event || 'event', data: event.data };
  }
}

async function handleNewMessage(message: string): Promise<void> {
  state.messages.push(
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
  );
  const stream = await completion(notNull(state.chatId), message);
  for await (const chunk of parseSSEStream(stream)) {
    switch (chunk.event) {
      case 'event':
        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.content = lastMessage.content || '';
        lastMessage.content += JSON.parse(chunk.data);
        break;
    }
  }
}
</script>
<template>
  <div class='h-full relative grow flex flex-col gap-6 pt-6 mx-4'>
    <ChatMessages :messages="state.messages" />
    <ChatInput @message="handleNewMessage" />
  </div>
</template>
<style lang="scss" scoped>
</style>
