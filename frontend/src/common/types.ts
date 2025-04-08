export interface AssistantMessage {
  role: 'assistant';
  content: string;
}

export interface UserMessage {
  role: 'user';
  content: string;
}

export type Message = UserMessage | AssistantMessage;

export interface Chat {
  id: string;
  messages?: Message[];
}
