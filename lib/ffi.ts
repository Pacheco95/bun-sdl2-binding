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
    SDL_PollEvent,
    SDL_CreateRenderer,
    SDL_DestroyRenderer,
    SDL_SetRenderDrawColor,
    SDL_RenderPresent,
    SDL_RenderClear,
    SDL_RenderGeometry,
    SDL_LogMessage,
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
    returns: FFIType.ptr,
  },
  SDL_DestroyWindow: {
    args: [FFIType.ptr],
  },
  SDL_GetWindowTitle: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  SDL_GetError: {
    returns: FFIType.cstring,
  },
  SDL_ClearError: {},
  SDL_PollEvent: {
    args: [FFIType.ptr],
    returns: FFIType.int,
  },
  SDL_CreateRenderer: {
    args: [FFIType.ptr, FFIType.int, FFIType.u32],
    returns: FFIType.ptr,
  },
  SDL_DestroyRenderer: {
    args: [FFIType.ptr],
  },
  SDL_SetRenderDrawColor: {
    args: [FFIType.ptr, FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.int,
  },
  SDL_RenderPresent: {
    args: [FFIType.ptr],
  },
  SDL_RenderClear: {
    args: [FFIType.ptr],
    returns: FFIType.int,
  },
  SDL_RenderGeometry: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.int,
      FFIType.ptr,
      FFIType.int,
    ],
    returns: FFIType.int,
  },
  SDL_Log: {
    args: [FFIType.cstring],
  },
  SDL_LogMessage: {
    args: [FFIType.int, FFIType.int, FFIType.cstring],
  },
});

export {
  SDL_ClearError,
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_GetVersion,
  SDL_GetWindowTitle,
  SDL_Init,
  SDL_PollEvent,
  SDL_Quit,
  SDL_CreateRenderer,
  SDL_DestroyRenderer,
  SDL_SetRenderDrawColor,
  SDL_RenderPresent,
  SDL_RenderClear,
  SDL_RenderGeometry,
  SDL_LogMessage,
};
