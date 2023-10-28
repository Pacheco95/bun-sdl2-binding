import { ptr } from "bun:ffi";
import { SDL_CreateWindow as foreign } from "../ffi";

export const SDL_WINDOW_FULLSCREEN = 0x00000001;
export const SDL_WINDOW_OPENGL = 0x00000002;
export const SDL_WINDOW_SHOWN = 0x00000004;
export const SDL_WINDOW_HIDDEN = 0x00000008;
export const SDL_WINDOW_BORDERLESS = 0x00000010;
export const SDL_WINDOW_RESIZABLE = 0x00000020;
export const SDL_WINDOW_MINIMIZED = 0x00000040;
export const SDL_WINDOW_MAXIMIZED = 0x00000080;
export const SDL_WINDOW_MOUSE_GRABBED = 0x00000100;
export const SDL_WINDOW_INPUT_FOCUS = 0x00000200;
export const SDL_WINDOW_MOUSE_FOCUS = 0x00000400;
export const SDL_WINDOW_FULLSCREEN_DESKTOP = SDL_WINDOW_FULLSCREEN | 0x00001000;
export const SDL_WINDOW_FOREIGN = 0x00000800;
export const SDL_WINDOW_ALLOW_HIGHDPI = 0x00002000;

export const SDL_CreateWindow = (
  title: string,
  x: number,
  y: number,
  w: number,
  h: number,
  flags: number,
) => {
  const titleCstr = Buffer.from(`${title}\0`, "utf8");
  const window = foreign(ptr(titleCstr), x, y, w, h, flags);
  return window;
};
