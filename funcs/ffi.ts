import { dlopen, FFIType, suffix } from "bun:ffi";

const {
  symbols: { SDL_GetVersion, SDL_Init },
} = dlopen(`libSDL2.${suffix}`, {
  SDL_GetVersion: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  SDL_Init: {
    args: [FFIType.u32],
    returns: FFIType.int
  }
});

export { SDL_GetVersion, SDL_Init };
