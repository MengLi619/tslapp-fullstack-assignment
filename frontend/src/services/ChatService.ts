import type { Chat } from '@/common/types.ts';
import { BACKEND_BASE_URL } from '@/common/constants.ts';
import { notNull, replaceUrlParams } from '@/common/utils.ts';

const CREATE_CHAT_URL = `${BACKEND_BASE_URL}/v1/chats`;
const COMPLETION_URL = `${BACKEND_BASE_URL}/v1/chats/:chatId/completion`;

export async function createChat(): Promise<Chat> {
  return (await (await fetch(CREATE_CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })).json()) as Chat;
}

export async function completion(chatId: string, message: string): Promise<ReadableStream<Uint8Array>> {
  return notNull((await fetch(replaceUrlParams(COMPLETION_URL, { chatId: chatId }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userMessage: message,
    }),
  })).body);
}
