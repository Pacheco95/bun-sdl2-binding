import { SDL_PollEvent as foreign } from "../ffi";
import { SDL_Event } from "../events/event.ts";

export const SDL_PollEvent = (event = new SDL_Event()) => {
  const result = foreign(event.buffer);
  return result == 1 ? event : null;
};
