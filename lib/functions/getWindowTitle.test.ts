import { afterEach, describe, expect, test } from "bun:test";
import {
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_GetWindowTitle,
  SDL_Quit,
  SDL_WINDOW_HIDDEN,
} from ".";

afterEach(SDL_Quit);

describe("SDL_GetWindowTitle", () => {
  test("should get window title", () => {
    const window = SDL_CreateWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    expect(SDL_GetWindowTitle(window).toString()).toBe("Test");
    SDL_DestroyWindow(window!);
    expect(SDL_GetError()).toBeEmpty();
  });
});
