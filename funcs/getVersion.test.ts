import { expect, test } from "bun:test";
import { getVersion } from ".";

test("should get version", () => {
  expect(String(getVersion())).toMatch(/2\.\d+.\d+/);
});
