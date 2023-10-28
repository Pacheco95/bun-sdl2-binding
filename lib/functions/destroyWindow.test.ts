import { afterEach, describe, expect, test } from "bun:test";
import { SDL_CreateWindow, SDL_WINDOW_HIDDEN } from "./createWindow";
import { SDL_DestroyWindow } from "./destroyWindow";
import { SDL_GetError } from "./getError";
import { SDL_Quit } from "./quit";

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
