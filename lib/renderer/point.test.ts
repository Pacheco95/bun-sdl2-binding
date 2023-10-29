import {describe, expect, test} from "bun:test";
import {Point} from "./point.ts";

describe('Point', () => {
  test("should create empty point", () => {
    const zero = new Point()
    expect(zero.xy).toEqual([0,0])
  })

  test("should create point with named coordinates", () => {
    const zero = new Point({x: 100, y: 200})
    expect(zero.xy).toEqual([100, 200])
  })

  test("should create point with positional coordinates", () => {
    const zero = new Point(100, 200)
    expect(zero.xy).toEqual([100, 200])
  })

  test("should create point with array coordinates", () => {
    const zero = new Point([100, 200])
    expect(zero.xy).toEqual([100, 200])
  })

  test("should create point from another point", () => {
    const original = new Point([100, 200])
    const copy = new Point(original)
    copy.xy = [50, 50]
    expect(original.xy).toEqual([100, 200])
    expect(copy.xy).toEqual([50, 50])
  })

  test("point size in bytes should be 8", () => {
    expect(Point.SIZE_BYTES).toBe(8)
  })
});