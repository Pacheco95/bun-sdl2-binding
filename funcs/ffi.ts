import { dlopen, FFIType, suffix } from "bun:ffi";

const {
  symbols: { SDL_GetVersion, SDL_Init, SDL_Quit },
} = dlopen(`libSDL2.${suffix}`, {
  SDL_GetVersion: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  SDL_Init: {
    args: [FFIType.u32],
    returns: FFIType.int,
  },
  SDL_Quit: {
    returns: FFIType.void,
  },
});

export { SDL_GetVersion, SDL_Init, SDL_Quit };
