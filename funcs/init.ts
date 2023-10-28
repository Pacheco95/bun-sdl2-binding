import { SDL_Init } from "./ffi";

export const SDL_INIT_TIMER = 0x00000001;
export const SDL_INIT_AUDIO = 0x00000010;
export const SDL_INIT_VIDEO = 0x00000020;
export const SDL_INIT_JOYSTICK = 0x00000200;
export const SDL_INIT_HAPTIC = 0x00001000;
export const SDL_INIT_GAMECONTROLLER = 0x00002000;
export const SDL_INIT_EVENTS = 0x00004000;
export const SDL_INIT_SENSOR = 0x00008000;
export const SDL_INIT_NOPARACHUTE = 0x00100000;
export const SDL_INIT_EVERYTHING =
  SDL_INIT_TIMER |
  SDL_INIT_AUDIO |
  SDL_INIT_VIDEO |
  SDL_INIT_EVENTS |
  SDL_INIT_JOYSTICK |
  SDL_INIT_HAPTIC |
  SDL_INIT_GAMECONTROLLER |
  SDL_INIT_SENSOR;

class InitializationError extends Error {}

export const init = (flags: number) => {
  const result = SDL_Init(flags);
  
  if (result !== 0) {
    throw new InitializationError();
  }
};
