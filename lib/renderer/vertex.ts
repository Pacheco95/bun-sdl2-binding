import { Color, ColorArray, ColorRGBA, ConstructColor } from "./color.ts";
import { ConstructPoint, Point, PointArray, PointXY } from "./point.ts";

interface CreateVertex {
  position: PointXY | PointArray;
  color: ColorRGBA | ColorArray;
  texCoord?: PointXY | PointArray;
}

// Bytes offset
const POS_X = 0;
const POS_Y = 4;
const COLOR_R = 8;
const COLOR_G = 9;
const COLOR_B = 10;
const COLOR_A = 11;
const TEX_X = 12;
const TEX_Y = 16;

export class Vertex {
  public static readonly SIZE_BYTES =
    2 * Float32Array.BYTES_PER_ELEMENT +
    4 * Uint8Array.BYTES_PER_ELEMENT +
    2 * Float32Array.BYTES_PER_ELEMENT;

  array = new Uint8ClampedArray(Vertex.SIZE_BYTES);

  private dv = new DataView(this.array.buffer);

  #position: Point;
  #color: Color;
  #texCoord: Point;

  constructor({ position, color, texCoord }: CreateVertex) {
    this.position = new Point(position);
    this.color = new Color(color);
    this.texCoord = new Point(texCoord);
  }

  get position() {
    return this.#position;
  }

  set position(newPosition: ConstructPoint) {
    this.#position = new Point(newPosition);

    this.dv.setFloat32(POS_X, this.#position.x, true);
    this.dv.setFloat32(POS_Y, this.#position.y, true);
  }

  get color() {
    return this.#color;
  }

  set color(color: ConstructColor) {
    this.#color = new Color(color);

    this.dv.setUint8(COLOR_R, this.#color.r);
    this.dv.setUint8(COLOR_G, this.#color.g);
    this.dv.setUint8(COLOR_B, this.#color.b);
    this.dv.setUint8(COLOR_A, this.#color.a);
  }

  get texCoord() {
    return this.#texCoord;
  }

  set texCoord(newTexCoord: ConstructPoint) {
    this.#texCoord = new Point(newTexCoord);

    this.dv.setFloat32(TEX_X, this.#texCoord.x, true);
    this.dv.setFloat32(TEX_Y, this.#texCoord.y, true);
  }

  toJSON() {
    return this.toString();
  }
}

Vertex.prototype.toString = function () {
  return JSON.stringify({
    position: this.position,
    color: this.color,
    texCoord: this.texCoord,
  });
};
