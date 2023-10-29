import { SDL_CreateRenderer as foreign } from "../ffi.ts";
import { Pointer } from "bun:ffi";

export const SDL_RENDERER_SOFTWARE = 0x00000001;
export const SDL_RENDERER_ACCELERATED = 0x00000002;
export const SDL_RENDERER_PRESENTVSYNC = 0x00000004;
export const SDL_RENDERER_TARGETTEXTURE = 0x0000000;

export const SDL_CreateRenderer = (
  window: Pointer,
  index: number,
  flags: number,
) => {
  return foreign(window, index, flags);
};
