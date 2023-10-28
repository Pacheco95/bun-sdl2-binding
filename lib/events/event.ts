import { ptr, read } from "bun:ffi";

import { SDL_EventType } from "./eventType.ts";
import { KeyboardEvent } from "./keyboard/keyboardEvent.ts";

export class SDL_Event {
  buffer = new Uint8ClampedArray(56);

  get type(): SDL_EventType {
    return read.u32(ptr(this.buffer), 0);
  }

  get timestamp(): number {
    return read.u32(ptr(this.buffer), 4);
  }

  get key() {
    return new KeyboardEvent(this.buffer);
  }
}
