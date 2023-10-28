import { describe, expect, test } from "bun:test";
import { SDL_INIT_EVERYTHING, SDL_Init } from "./init";


describe("SDL_Init", () => {
  test("should initialize all systems", () => {
    expect(() => SDL_Init(SDL_INIT_EVERYTHING)).not.toThrow();
  });
});
