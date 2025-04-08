export function notNull<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new Error(message || `Value can't be empty`);
  }
  return value;
}

export function replaceUrlParams(url: string, params: object): string {
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, encodeURIComponent(value));
  });
  return url;
}
