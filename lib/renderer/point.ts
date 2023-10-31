export type PointArray = [number, number];

export type PointXY =
  | {
      x: number;
      y: number;
    }
  | Point;

export type CreatePoint = PointXY | PointArray;

const X_POS = 0;
const Y_POS = 4;

export class Point {
  public static readonly SIZE_BYTES = 2 * Float32Array.BYTES_PER_ELEMENT;
  readonly array = new Uint8ClampedArray(Point.SIZE_BYTES);
  readonly #dv = new DataView(this.array.buffer);

  constructor(props?: CreatePoint);
  constructor(x?: number, y?: number);
  constructor(props?: number | CreatePoint, y?: number) {
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

  static rotate(deg: number, point: Point, pivot = new Point(0, 0)): Point {
    const angleInRadians = (deg * Math.PI) / 180;
    const cosTheta = Math.cos(angleInRadians);
    const sinTheta = Math.sin(angleInRadians);

    const translatedX = point.x - pivot.x;
    const translatedY = point.y - pivot.y;

    const newX = translatedX * cosTheta - translatedY * sinTheta + pivot.x;
    const newY = translatedX * sinTheta + translatedY * cosTheta + pivot.y;

    return new Point(newX, newY);
  }

  static translate(point: Point, offset: Point) {
    return new Point(point.x + offset.x, point.y + offset.y);
  }

  rotated(deg: number, pivot = new Point(0, 0)) {
    this.xy = Point.rotate(deg, this, pivot).xy;
  }

  translated(offset: Point) {
    this.xy = Point.translate(this, offset).xy;
  }
}
