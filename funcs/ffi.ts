import { dlopen, FFIType, suffix } from "bun:ffi";

const {
  symbols: { SDL_GetVersion },
} = dlopen(`libSDL2.${suffix}`, {
  SDL_GetVersion: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
});

export { SDL_GetVersion };
