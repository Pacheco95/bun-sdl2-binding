import { Pointer } from "bun:ffi";
import { SDL_DestroyWindow } from "./ffi";

export const destroyWindow = (window: Pointer) => {
  SDL_DestroyWindow(window);
};
