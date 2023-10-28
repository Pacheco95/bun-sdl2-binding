import { dlopen, FFIType, suffix } from "bun:ffi";

const {
  symbols: { SDL_GetVersion, SDL_Init, SDL_Quit, SDL_CreateWindow },
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
  SDL_CreateWindow: {
    args: [
      FFIType.cstring, // title
      FFIType.int, // x
      FFIType.int, // y
      FFIType.int, // w
      FFIType.int, // h
      FFIType.u32, // flags
    ],
    returns: FFIType.pointer,
  },
});

export { SDL_GetVersion, SDL_Init, SDL_Quit, SDL_CreateWindow };
