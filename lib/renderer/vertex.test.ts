import { describe, expect, test } from "bun:test";
import { Vertex } from "./vertex.ts";
import { Point } from "./point.ts";
import { Color } from "./color.ts";

describe("Vertex", () => {
  const VERT_SAMPLE = new Vertex({
    position: new Point(10, 20),
    color: Color.BLACK,
    texCoord: new Point(100, 200),
  });

  test("vertex size in bytes should be 20", () => {
    expect(Vertex.SIZE_BYTES).toBe(20);
  });

  test("should create vertex using corresponding class instances", () => {
    expect(VERT_SAMPLE.position.xy).toEqual([10, 20]);
    expect(VERT_SAMPLE.color.rgba).toEqual(Color.BLACK.rgba);
    expect(VERT_SAMPLE.texCoord.xy).toEqual([100, 200]);
  });

  test("should create vertex with default texCoord using corresponding class instances", () => {
    const vertex = new Vertex({
      position: new Point(10, 20),
      color: Color.BLACK,
    });

    expect(vertex.position.xy).toEqual([10, 20]);
    expect(vertex.color.rgba).toEqual(Color.BLACK.rgba);
    expect(vertex.texCoord.xy).toEqual([0, 0]);
  });

  test("should create vertex using arrays", () => {
    const vertex = new Vertex({
      position: [10, 20],
      color: [0, 0, 0, 255],
      texCoord: [100, 200],
    });

    expect(vertex.position.xy).toEqual([10, 20]);
    expect(vertex.color.rgba).toEqual(Color.BLACK.rgba);
    expect(vertex.texCoord.xy).toEqual([100, 200]);
  });

  test("should create vertex with default texCoord using arrays", () => {
    const vertex = new Vertex({
      position: [10, 20],
      color: [0, 0, 0, 255],
    });

    expect(vertex.position.xy).toEqual([10, 20]);
    expect(vertex.color.rgba).toEqual(Color.BLACK.rgba);
    expect(vertex.texCoord.xy).toEqual([0, 0]);
  });

  test("should create vertex using array of arrays", () => {
    const vertex = new Vertex([
      [10, 20],
      [0, 0, 0, 255],
      [100, 200],
    ]);

    expect(vertex.position.xy).toEqual([10, 20]);
    expect(vertex.color.rgba).toEqual(Color.BLACK.rgba);
    expect(vertex.texCoord.xy).toEqual([100, 200]);
  });

  test("should create vertex with default texCoord using array of arrays", () => {
    const vertex = new Vertex([
      [10, 20],
      [255, 255, 255, 255],
    ]);

    expect(vertex.position.xy).toEqual([10, 20]);
    expect(vertex.color.rgba).toEqual(Color.WHITE.rgba);
    expect(vertex.texCoord.xy).toEqual([0, 0]);
  });

  test("should create vertex using class instances as positional arguments", () => {
    const vertex1 = new Vertex(
      new Point(10, 20),
      new Color(255, 0, 0, 80),
      new Point(-1, 1),
    );

    const vertex2 = new Vertex([10, 20], [255, 0, 0, 80], [-1, 1]);

    const vertex3 = new Vertex(
      { x: 10, y: 20 },
      { r: 255, g: 0, b: 0, a: 80 },
      { x: -1, y: 1 },
    );

    expect(vertex1.position.xy).toEqual([10, 20]);
    expect(vertex1.color.rgba).toEqual([255, 0, 0, 80]);
    expect(vertex1.texCoord.xy).toEqual([-1, 1]);

    expect(vertex2).toEqual(vertex1);
    expect(vertex3).toEqual(vertex1);
  });

  test("should create same vertex with default texCoord using class instances as positional arguments", () => {
    const vertex1 = new Vertex(new Point(10, 20), new Color(255, 0, 0, 80));
    const vertex2 = new Vertex([10, 20], [255, 0, 0, 80]);
    const vertex3 = new Vertex({ x: 10, y: 20 }, new Color(255, 0, 0, 80));

    expect(vertex1.position.xy).toEqual([10, 20]);
    expect(vertex1.color.rgba).toEqual([255, 0, 0, 80]);
    expect(vertex1.texCoord.xy).toEqual([0, 0]);

    expect(vertex2).toEqual(vertex1);
    expect(vertex3).toEqual(vertex1);
  });

  test("should create vertex from another vertex", () => {
    const copy = new Vertex(VERT_SAMPLE);

    copy.position = [800, 600];
    copy.color = Color.WHITE;
    copy.texCoord = [-1, 1];

    expect(VERT_SAMPLE.position.xy).toEqual([10, 20]);
    expect(VERT_SAMPLE.color.rgba).toEqual(Color.BLACK.rgba);
    expect(VERT_SAMPLE.texCoord.xy).toEqual([100, 200]);

    expect(copy.position.xy).toEqual([800, 600]);
    expect(copy.color).toEqual(Color.WHITE);
    expect(copy.texCoord.xy).toEqual([-1, 1]);
  });
});
