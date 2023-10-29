import {Color, ColorArray} from "./color.ts";
import {Point, PointArray} from "./point.ts";

interface CreateVertex {
  position: Point | PointArray;
  color: Color | ColorArray;
  texCoord?: Point | PointArray;
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
  public static SIZE_BYTES =
    2 * Float32Array.BYTES_PER_ELEMENT +
    4 * Uint8Array.BYTES_PER_ELEMENT +
    2 * Float32Array.BYTES_PER_ELEMENT;

  array = new Uint8ClampedArray(Vertex.SIZE_BYTES)
  
  private dv = new DataView(this.array.buffer);

  constructor({ position, color, texCoord = [0, 0] }: CreateVertex) {
    const posX = Array.isArray(position) ? position[0] : position.x;
    const posY = Array.isArray(position) ? position[1] : position.y;

    const [r, g, b, a] = Array.isArray(color)
      ? color
      : [color.r, color.g, color.b, color.a];

    const texX = Array.isArray(texCoord) ? texCoord[0] : texCoord!.x;
    const texY = Array.isArray(texCoord) ? texCoord[1] : texCoord!.y;

    this.dv.setFloat32(POS_X, posX);
    this.dv.setFloat32(POS_Y, posY);

    this.dv.setUint8(COLOR_R, r);
    this.dv.setUint8(COLOR_G, g);
    this.dv.setUint8(COLOR_B, b);
    this.dv.setUint8(COLOR_A, a);

    this.dv.setFloat32(TEX_X, texX);
    this.dv.setFloat32(TEX_Y, texY);
  }

  get position(): PointArray {
    return [this.dv.getFloat32(POS_X), this.dv.getFloat32(POS_Y)];
  }

  get color(): ColorArray {
    return [
      this.dv.getUint8(COLOR_R),
      this.dv.getUint8(COLOR_G),
      this.dv.getUint8(COLOR_B),
      this.dv.getUint8(COLOR_A),
    ];
  }

  get texCoord(): PointArray {
    return [this.dv.getFloat32(TEX_X), this.dv.getFloat32(TEX_Y)];
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
