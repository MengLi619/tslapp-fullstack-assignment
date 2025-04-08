<script setup lang="ts">
import { reactive } from 'vue';

interface Emits {
  (event: 'message', message: string): void;
}

interface State {
  message?: string;
}

const state = reactive<State>({});
const emits = defineEmits<Emits>();

function handleEnter(e: KeyboardEvent) {
  if (!e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
}

function handleSendMessage() {
  if (state.message) {
    emits('message', state.message);
    state.message = '';
  }
}
</script>
<template>
  <div class="sticky bottom-0 bg-white py-4">
    <div
      class="p-1.5 bg-primary-blue/35 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400">
      <div
        class="pr-0.5 bg-white relative shrink-0 rounded-3xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all">
        <textarea
          v-model="state.message"
          class="block w-full max-h-[140px] py-2 px-4 pr-20 bg-white rounded-3xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none"
          @keydown.enter="handleEnter"
          rows="1"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
