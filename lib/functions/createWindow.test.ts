import { describe, expect, test } from "bun:test";
import { SDL_CreateWindow, SDL_WINDOW_HIDDEN } from "./createWindow";
import { SDL_DestroyWindow } from "./destroyWindow";
import { SDL_Quit } from "./quit";

describe("SDL_CreateWindow", () => {
  test("should create window", () => {
    const window = SDL_CreateWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    expect(window).toBeNumber();
    SDL_DestroyWindow(window!);
    SDL_Quit();
  });
});
