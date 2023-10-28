import { describe, expect, test } from "bun:test";
import { SDL_GetError } from "../ffi";
import { SDL_Quit } from "./quit";

describe("SDL_Quit", () => {
  test("should quit", () => {
    expect(SDL_GetError()).toBeEmpty();
    SDL_Quit();
  });
});
