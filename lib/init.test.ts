import { describe, expect, test } from "bun:test";
import { SDL_INIT_EVERYTHING, SDL_Init } from "./init";


describe("init", () => {
  test("should initialize all systems", () => {
    expect(() => SDL_Init(SDL_INIT_EVERYTHING)).not.toThrow();
  });
});
