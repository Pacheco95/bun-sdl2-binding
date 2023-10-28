import { CString, Pointer } from "bun:ffi";
import { describe, expect, test } from "bun:test";
import { SDL_WINDOW_HIDDEN, createWindow } from "./createWindow";
import { destroyWindow } from "./destroyWindow";
import { quit } from "./quit";
import { getWindowTitle } from "./getWindowTitle";

describe("createWindow", () => {
  test("should create window", () => {
    let window: Pointer | null = null;

    expect(() => {
      window = createWindow("Test", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    }).not.toThrow();

    expect(getWindowTitle(window).toString()).toBe("Test");

    expect(window).toBeNumber();
    destroyWindow(window!);
    quit();
  });
});
