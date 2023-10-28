import { describe, expect, test } from "bun:test";
import { SDL_Quit } from "./quit";

describe("SDL_Quit", () => {
  test("should quit", () => {
    expect(SDL_Quit).not.toThrow();
  });
});
