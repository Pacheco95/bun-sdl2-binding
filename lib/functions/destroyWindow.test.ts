import { afterEach, describe, expect, test } from "bun:test";
import {
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_Quit,
  SDL_WINDOW_HIDDEN,
} from ".";

afterEach(SDL_Quit);

describe("SDL_DestroyWindow", () => {
  test("should destroy window", () => {
    expect(SDL_GetError()).toBeEmpty();

    const window = SDL_CreateWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    expect(SDL_GetError()).toBeEmpty();

    SDL_DestroyWindow(window!);
    expect(SDL_GetError()).toBeEmpty();
  });
});
