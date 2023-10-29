import { afterEach, describe, expect, test } from "bun:test";
import { SDL_GetError, SDL_Init, SDL_INIT_EVERYTHING, SDL_Quit } from ".";

afterEach(SDL_Quit);

describe("SDL_Init", () => {
  test("should initialize all systems", () => {
    expect(SDL_GetError()).toBeEmpty();
    SDL_Init(SDL_INIT_EVERYTHING);
    expect(SDL_GetError()).toBeEmpty();
  });
});
