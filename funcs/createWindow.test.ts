import { afterAll, describe, expect, test } from "bun:test";
import { SDL_WINDOW_HIDDEN, createWindow } from "./createWindow";
import { quit } from "./quit";

afterAll(quit);

describe("createWindow", () => {
  test("should create window", () => {
    expect(() => {
      createWindow("Teste", 0, 0, 800, 600, SDL_WINDOW_HIDDEN);
    }).not.toThrow();
  });
});
