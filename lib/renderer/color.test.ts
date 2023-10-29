import { describe, expect, test } from "bun:test";
import { Color } from "./color.ts";

describe("Color", () => {
  test("color size in bytes is 4", () => {
    expect(Color.SIZE_BYTES).toBe(4);
  });

  test("should create color with named channels", () => {
    const color = new Color({ r: 0, g: 0, b: 0, a: 255 });
    expect(color).toEqual(Color.BLACK);
  });

  test("should create color with default named channels", () => {
    expect(new Color({})).toEqual(Color.BLACK);
  });

  test("should create opaque white color with default named channels", () => {
    expect(new Color({ r: 255, g: 255, b: 255 })).toEqual(Color.WHITE);
  });

  test("should create color from another color", () => {
    const original = Color.WHITE;
    const copy = new Color(original);
    copy.rgba = Color.BLACK.rgba;

    expect(original).toEqual(Color.WHITE);
    expect(copy).toEqual(Color.BLACK);
  });

  test("should create color from hex string", () => {
    expect(new Color("#000")).toEqual(Color.BLACK);
    expect(new Color("#000", 0)).toEqual(Color.TRANSPARENT);
    expect(new Color("#0000")).toEqual(Color.TRANSPARENT);
    expect(new Color("#fff")).toEqual(Color.WHITE);
  });
});
