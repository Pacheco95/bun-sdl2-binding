export type ColorArray = [number, number, number, number];
export type ColorRGBA =
  | {
      r?: number;
      g?: number;
      b?: number;
      a?: number;
    }
  | Color;

export type CreateColor = ColorRGBA | ColorArray;

const COLOR_R = 0;
const COLOR_G = 1;
const COLOR_B = 2;
const COLOR_A = 3;

export class Color {
  public static readonly SIZE_BYTES = 4 * Uint8Array.BYTES_PER_ELEMENT;
  public static BLACK = new Color(0, 0, 0, 255);
  public static WHITE = new Color(255, 255, 255, 255);
  readonly array = new Uint8ClampedArray(Color.SIZE_BYTES);
  readonly #dv = new DataView(this.array.buffer);

  constructor(props?: CreateColor);

  constructor(r?: number, g?: number, b?: number, a?: number);

  constructor(props?: number | CreateColor, g = 0, b = 0, a = 255) {
    if (Array.isArray(props)) {
      this.rgba = props;
      return;
    }

    if (typeof props === "object") {
      this.rgba = [props.r || 0, props.g || 0, props.b || 0, props.a || 255];
      return;
    }

    this.rgba = [props || 0, g, b, a];
  }

  get r() {
    return this.#dv.getUint8(COLOR_R);
  }

  set r(r) {
    this.#dv.setUint8(COLOR_R, r);
  }

  get g() {
    return this.#dv.getUint8(COLOR_G);
  }

  set g(g) {
    this.#dv.setUint8(COLOR_G, g);
  }

  get b() {
    return this.#dv.getUint8(COLOR_B);
  }

  set b(b) {
    this.#dv.setUint8(COLOR_B, b);
  }

  get a() {
    return this.#dv.getUint8(COLOR_A);
  }

  set a(a) {
    this.#dv.setUint8(COLOR_A, a);
  }

  get rgba(): ColorArray {
    return [this.r, this.g, this.b, this.a];
  }

  set rgba([r, g, b, a]: ColorArray) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}
