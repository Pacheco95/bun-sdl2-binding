import { SDL_LogMessage as foreign } from "../ffi.ts";
import { Pointer, ptr } from "bun:ffi";

export enum SDL_LogPriority {
  // noinspection JSUnusedGlobalSymbols
  SDL_LOG_PRIORITY_VERBOSE = 1,
  SDL_LOG_PRIORITY_DEBUG,
  SDL_LOG_PRIORITY_INFO,
  SDL_LOG_PRIORITY_WARN,
  SDL_LOG_PRIORITY_ERROR,
  SDL_LOG_PRIORITY_CRITICAL,
  SDL_NUM_LOG_PRIORITIES,
}

export enum SDL_LogCategory {
  // noinspection JSUnusedGlobalSymbols
  SDL_LOG_CATEGORY_APPLICATION,
  SDL_LOG_CATEGORY_ERROR,
  SDL_LOG_CATEGORY_ASSERT,
  SDL_LOG_CATEGORY_SYSTEM,
  SDL_LOG_CATEGORY_AUDIO,
  SDL_LOG_CATEGORY_VIDEO,
  SDL_LOG_CATEGORY_RENDER,
  SDL_LOG_CATEGORY_INPUT,
  SDL_LOG_CATEGORY_TEST,

  SDL_LOG_CATEGORY_RESERVED1,
  SDL_LOG_CATEGORY_RESERVED2,
  SDL_LOG_CATEGORY_RESERVED3,
  SDL_LOG_CATEGORY_RESERVED4,
  SDL_LOG_CATEGORY_RESERVED5,
  SDL_LOG_CATEGORY_RESERVED6,
  SDL_LOG_CATEGORY_RESERVED7,
  SDL_LOG_CATEGORY_RESERVED8,
  SDL_LOG_CATEGORY_RESERVED9,
  SDL_LOG_CATEGORY_RESERVED10,
  SDL_LOG_CATEGORY_CUSTOM,
}

export const SDL_LogMessage = (
  category: SDL_LogCategory,
  priority: SDL_LogPriority,
  msg: string | Pointer,
) => {
  const cStrPointer =
    typeof msg === "string" ? ptr(Buffer.from(msg + "\0", "utf8")) : msg;
  return foreign(category, priority, cStrPointer);
};

export const SDL_Log = (msg: string | Pointer) => {
  return SDL_LogMessage(
    SDL_LogCategory.SDL_LOG_CATEGORY_APPLICATION,
    SDL_LogPriority.SDL_LOG_PRIORITY_INFO,
    msg,
  );
};

export const SDL_LogDebug = (
  category: SDL_LogCategory,
  msg: string | Pointer,
) => {
  return SDL_LogMessage(category, SDL_LogPriority.SDL_LOG_PRIORITY_DEBUG, msg);
};

export const SDL_LogCritical = (
  category: SDL_LogCategory,
  msg: string | Pointer,
) => {
  return SDL_LogMessage(
    category,
    SDL_LogPriority.SDL_LOG_PRIORITY_CRITICAL,
    msg,
  );
};

export const SDL_LogError = (
  category: SDL_LogCategory,
  msg: string | Pointer,
) => {
  return SDL_LogMessage(category, SDL_LogPriority.SDL_LOG_PRIORITY_ERROR, msg);
};

export const SDL_LogInfo = (
  category: SDL_LogCategory,
  msg: string | Pointer,
) => {
  return SDL_LogMessage(category, SDL_LogPriority.SDL_LOG_PRIORITY_INFO, msg);
};

export const SDL_LogVerbose = (
  category: SDL_LogCategory,
  msg: string | Pointer,
) => {
  return SDL_LogMessage(
    category,
    SDL_LogPriority.SDL_LOG_PRIORITY_VERBOSE,
    msg,
  );
};

export const SDL_LogWarn = (
  category: SDL_LogCategory,
  msg: string | Pointer,
) => {
  return SDL_LogMessage(category, SDL_LogPriority.SDL_LOG_PRIORITY_WARN, msg);
};
