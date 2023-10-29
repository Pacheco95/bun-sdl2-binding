import { SDL_SetRenderDrawColor as foreign } from "../ffi.ts";
import { Pointer } from "bun:ffi";

export const SDL_SetRenderDrawColor = (
  renderer: Pointer,
  r: number,
  g: number,
  b: number,
  a: number,
) => {
  return foreign(renderer, r, g, b, a) === 0;
};
