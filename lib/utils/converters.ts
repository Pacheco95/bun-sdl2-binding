import { ptr } from "bun:ffi";

export const strToPtr = (s: string) =>
  ptr(Buffer.from(s.endsWith("\0") ? s : s + "\0"));
