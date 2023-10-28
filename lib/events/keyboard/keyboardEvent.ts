import { ptr, read } from "bun:ffi";
import { KeySym } from "./keySym.ts";

enum KeyboardEventType {
  SDL_KEYDOWN = 0x300,
  SDL_KEYUP,
  SDL_TEXTEDITING,
  SDL_TEXTINPUT,
  SDL_KEYMAPCHANGED,
}

enum KeyState {
  SDL_KEYDOWN = 0x300,
  SDL_KEYUP,
}

export class KeyboardEvent {
  constructor(private readonly buffer: Uint8ClampedArray) {}

  get type(): KeyboardEventType {
    return read.u32(ptr(this.buffer), 0);
  }

  get timestamp() {
    return read.u32(ptr(this.buffer), 4);
  }

  get windowID() {
    return read.u32(ptr(this.buffer), 8);
  }

  get state(): KeyState {
    return read.u8(ptr(this.buffer), 12);
  }

  get repeat() {
    return read.u8(ptr(this.buffer), 13) !== 0;
  }

  get keysym(): KeySym {
    return new KeySym(this.buffer);
  }
}
