import { describe, expect, test } from "bun:test";
import { SDL_INIT_EVERYTHING, init } from "./init";


describe("init", () => {
  test("should initialize all systems", () => {
    expect(() => init(SDL_INIT_EVERYTHING)).not.toThrow();
  });
});
