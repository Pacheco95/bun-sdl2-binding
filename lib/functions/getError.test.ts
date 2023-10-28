import { afterEach, describe, expect, test } from "bun:test";
import { SDL_GetError, SDL_Quit } from ".";

afterEach(SDL_Quit);

describe("SDL_GetError", () => {
  test("should get empty error", () => {
    expect(SDL_GetError()).toBeEmpty();
  });
});
