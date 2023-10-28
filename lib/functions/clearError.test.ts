import { afterEach, describe, expect, test } from "bun:test";
import { SDL_ClearError, SDL_GetError, SDL_Quit } from ".";

afterEach(SDL_Quit);

describe("SDL_ClearError", () => {
  test("should clear error", () => {
    expect(SDL_GetError()).toBeEmpty();

    SDL_ClearError();
    expect(SDL_GetError()).toBeEmpty();
  });
});
