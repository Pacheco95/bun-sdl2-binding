import { describe, expect, test } from "bun:test";
import { SDL_GetError, SDL_Quit } from ".";

describe("SDL_Quit", () => {
  test("should quit", () => {
    expect(SDL_GetError()).toBeEmpty();
    SDL_Quit();
  });
});
