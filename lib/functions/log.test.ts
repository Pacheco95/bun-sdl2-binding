import { describe, test } from "bun:test";
import {
  SDL_LogCategory,
  SDL_LogCritical,
  SDL_LogDebug,
  SDL_LogError,
  SDL_LogInfo,
  SDL_LogMessage,
  SDL_LogPriority,
  SDL_LogVerbose,
  SDL_LogWarn,
} from "./log.ts";
import { ptr } from "bun:ffi";

const priorities = Object.entries(SDL_LogPriority).slice(
  Object.keys(SDL_LogPriority).length / 2,
);
const categories = Object.entries(SDL_LogCategory).slice(
  Object.keys(SDL_LogCategory).length / 2,
);

describe("Logging", () => {
  test("should log message with different categories and priorities using char pointer", () => {
    for (const [priorityKey, priorityValue] of priorities) {
      for (let [categoryKey, categoryValue] of categories) {
        const priority = priorityKey.substring("SDL_LOG_PRIORITY_".length);
        const category = categoryKey.substring("SDL_LOG_CATEGORY_".length);

        const msg = `[Priority=${priority}, Category=${category}]\0`;
        const cStr = Buffer.from(msg, "utf8");

        SDL_LogMessage(categoryValue, priorityValue, ptr(cStr));
      }
    }
  });

  test("should log message with different functions and categories", () => {
    for (let [categoryKey, categoryValue] of categories) {
      const category = categoryKey.substring("SDL_LOG_CATEGORY_".length);
      const msg = `[Category=${category}]`;

      SDL_LogDebug(categoryValue, msg);
      SDL_LogCritical(categoryValue, msg);
      SDL_LogError(categoryValue, msg);
      SDL_LogInfo(categoryValue, msg);
      SDL_LogVerbose(categoryValue, msg);
      SDL_LogWarn(categoryValue, msg);
    }
  });
});
