import { afterAll, afterEach, describe, expect, test } from "bun:test";
import { SDL_CreateWindow, SDL_WINDOW_HIDDEN } from "./createWindow";
import { SDL_DestroyWindow } from "./destroyWindow";
import { SDL_GetWindowTitle } from "./getWindowTitle";
import { SDL_Quit } from "./quit";
import { SDL_GetError } from "./getError";

afterEach(SDL_Quit)

describe("SDL_GetWindowTitle", () => {
  test("should get window title", () => {
    const window = SDL_CreateWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    expect(SDL_GetWindowTitle(window).toString()).toBe("Test");
    SDL_DestroyWindow(window!);
    expect(SDL_GetError()).toBeEmpty()
  });
});
