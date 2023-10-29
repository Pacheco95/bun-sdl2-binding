export type PointArray = [number, number];

export type PointXY =
  | {
      x: number;
      y: number;
    }
  | Point;

export type ConstructPoint = PointXY | PointArray;

const X_POS = 0;
const Y_POS = 4;

export class Point {
  public static readonly SIZE_BYTES = 2 * Float32Array.BYTES_PER_ELEMENT;
  readonly array = new Uint8ClampedArray(Point.SIZE_BYTES);
  readonly #dv = new DataView(this.array.buffer);

  constructor(props?: ConstructPoint);
  constructor(x?: number, y?: number);
  constructor(props?: number | ConstructPoint, y?: number) {
    if (Array.isArray(props)) {
      this.xy = props;
    } else if (typeof props === "object") {
      this.xy = [props.x, props.y];
    } else {
      this.x = props || 0;
      this.y = y || 0;
    }
  }

  get x() {
    return this.#dv.getFloat32(X_POS, true);
  }

  set x(value) {
    this.#dv.setFloat32(X_POS, value, true);
  }

  get y() {
    return this.#dv.getFloat32(Y_POS, true);
  }

  set y(value) {
    this.#dv.setFloat32(Y_POS, value, true);
  }

  get xy(): PointArray {
    return [this.x, this.y];
  }

  set xy([x, y]: PointArray) {
    this.x = x;
    this.y = y;
  }
}
