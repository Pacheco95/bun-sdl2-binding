import { dlopen, FFIType, suffix } from "bun:ffi";

const {
  symbols: {
    SDL_GetVersion,
    SDL_Init,
    SDL_Quit,
    SDL_CreateWindow,
    SDL_DestroyWindow,
    SDL_GetWindowTitle,
    SDL_GetError,
    SDL_ClearError,
  },
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
  SDL_DestroyWindow: {
    args: [FFIType.pointer],
  },
  SDL_GetWindowTitle: {
    args: [FFIType.pointer],
    returns: FFIType.cstring,
  },
  SDL_GetError: {
    returns: FFIType.cstring,
  },
  SDL_ClearError: {},
});

export {
  SDL_ClearError,
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_GetVersion,
  SDL_GetWindowTitle,
  SDL_Init,
  SDL_Quit,
};
