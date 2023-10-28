import { afterEach, describe, expect, test } from "bun:test";
import { SDL_INIT_EVERYTHING, init } from "./init";

afterEach(() => {})

describe("init", () => {
  test("should initialize all systems", () => {
    expect(() => init(SDL_INIT_EVERYTHING)).not.toThrow();
  });
});
