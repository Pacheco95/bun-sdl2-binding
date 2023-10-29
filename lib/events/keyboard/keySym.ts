import { ptr, read } from "bun:ffi";
import { ScanCode } from "./ScanCode.ts";

export class KeySym {
  constructor(private readonly buffer: Uint8ClampedArray) {}

  get scancode(): ScanCode {
    return read.i32(ptr(this.buffer), 16);
  }

  get sym(): number {
    return read.i32(ptr(this.buffer), 20);
  }

  get mod(): number {
    return read.i16(ptr(this.buffer), 24);
  }
}
