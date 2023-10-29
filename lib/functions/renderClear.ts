import { SDL_RenderClear as foreign } from "../ffi.ts";
import { Pointer } from "bun:ffi";

export const SDL_RenderClear = (window: Pointer) => {
  return foreign(window) === 0;
};
