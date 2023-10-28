import { afterEach, describe, expect, test } from "bun:test";
import { SDL_GetVersion, SDL_Quit } from ".";

afterEach(SDL_Quit);

describe("SDL_GetVersion", () => {
  test("should get version", () => {
    expect(String(SDL_GetVersion())).toMatch(/2\.\d+.\d+/);
  });
});
