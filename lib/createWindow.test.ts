import { describe, expect, test } from "bun:test";
import { SDL_CreateWindow, SDL_WINDOW_HIDDEN } from "./createWindow";
import { SDL_DestroyWindow } from "./destroyWindow";
import { SDL_GetWindowTitle } from "./getWindowTitle";
import { SDL_Quit } from "./quit";

describe("createWindow", () => {
  test("should create window", () => {
    const window = SDL_CreateWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    expect(window).toBeNumber();

    expect(SDL_GetWindowTitle(window).toString()).toBe("Test");

    SDL_DestroyWindow(window!);
    SDL_Quit();
  });
});
