import { describe, expect, test } from "bun:test";
import { quit } from "./quit";

describe("quit", () => {
  test("should quit", () => {
    expect(quit).not.toThrow();
  });
});
