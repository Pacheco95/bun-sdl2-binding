import { afterEach, describe, expect, test } from "bun:test";
import { SDL_CreateWindow, SDL_WINDOW_HIDDEN } from "./createWindow";
import { SDL_DestroyWindow } from "./destroyWindow";
import { SDL_GetError } from "./getError";
import { SDL_Quit } from "./quit";

afterEach(SDL_Quit)

describe("SDL_CreateWindow", () => {
  test("should create window", () => {
    const window = SDL_CreateWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    SDL_DestroyWindow(window!);

    expect(SDL_GetError()).toBeEmpty();
  });

  test("should fail to destroy nonexistent window", () => {
    expect(SDL_GetError()).toBeEmpty();

    SDL_DestroyWindow(null);

    expect(SDL_GetError().toString()).toBe(
      "Video subsystem has not been initialized"
    );
  });
});
