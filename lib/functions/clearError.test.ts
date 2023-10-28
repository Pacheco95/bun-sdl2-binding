import { describe, expect, test } from "bun:test";
import { SDL_ClearError } from "./clearError";
import { SDL_GetError } from "./getError";

describe("SDL_ClearError", () => {
  test("should clear error", () => {
    expect(SDL_GetError()).toBeEmpty();
    
    SDL_ClearError();
    expect(SDL_GetError()).toBeEmpty();
  });
});
