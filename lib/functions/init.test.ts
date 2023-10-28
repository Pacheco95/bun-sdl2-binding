import { afterEach, describe, expect, test } from "bun:test";
import { SDL_Quit } from ".";
import { SDL_GetError } from "./getError";
import { SDL_INIT_EVERYTHING, SDL_Init } from "./init";

afterEach(SDL_Quit);

describe("SDL_Init", () => {
  test("should initialize all systems", () => {
    expect(SDL_GetError()).toBeEmpty();
    SDL_Init(SDL_INIT_EVERYTHING);
    expect(SDL_GetError()).toBeEmpty();
  });
});
