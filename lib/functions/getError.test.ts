import { describe, expect, test } from "bun:test";
import { SDL_GetError } from "./getError";

describe("SDL_GetError", () => {
  test("should get empty error", () => {
    expect(SDL_GetError()).toBeEmpty();
  });
});
