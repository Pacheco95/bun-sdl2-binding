import { hexToRgba } from "../utils/hexToRgba.ts";

export type ColorArray = [number, number, number, number];
export type ColorRGBA =
  | {
      r?: number;
      g?: number;
      b?: number;
      a?: number;
    }
  | Color;

export type CreateColor = ColorRGBA | ColorArray | string;

const COLOR_R = 0;
const COLOR_G = 1;
const COLOR_B = 2;
const COLOR_A = 3;

export class Color {
  public static readonly SIZE_BYTES = 4 * Uint8Array.BYTES_PER_ELEMENT;
  public static readonly RED = new Color("f00");
  public static readonly GREEN = new Color("0f0");
  public static readonly BLUE = new Color("00f");
  public static readonly YELLOW = new Color(255, 255, 0, 255);
  public static readonly CYAN = new Color(0, 255, 255, 255);
  public static readonly MAGENTA = new Color(255, 0, 255, 255);
  public static readonly BLACK = new Color(0, 0, 0, 255);
  public static readonly WHITE = new Color("fff");
  public static readonly TRANSPARENT = new Color("0000");
  readonly array = new Uint8ClampedArray(Color.SIZE_BYTES);
  readonly #dv = new DataView(this.array.buffer);

  /**
   *
   * @param hex hexadecimal color. May be prefixed with "#".
   * @example new Color("#fff")
   * @example new Color("000f")
   * @example new Color("112233")
   * @example new Color("11223344")
   *
   * @throws Error if invalid hexadecimal string is provided
   */
  constructor(hex: string);

  /**
   * Creates an RGBA color with opaque alpha value by default
   * @param color
   *
   * @example new Color(255, 0, 0, 255)
   * @example new Color(255, 0, 0)
   * @example new Color([255, 0, 0])
   * @example new Color([255, 0, 0, 255])
   * @example new Color({ r: 255, g: 255, b: 255 })
   * @example new Color({ r: 255, g: 255, b: 255, a: 250 })
   */
  constructor(color: CreateColor);

  /**
   *
   * @param hex hexadecimal color. May be prefixed with "#".
   * @param alpha=1.0 if provided will replace the hex string alpha value.
   * @example new Color("#fff") # White
   * @example new Color("000f") # Black
   * @example new Color("ffffff00") # Transparent
   * @example new Color("ffffff00", 1.0) # White
   *
   * @throws Error if invalid hexadecimal string is provided
   */
  constructor(hex: string, alpha?: number);

  constructor(r: number, g: number, b: number, a?: number);

  constructor(
    props: number | CreateColor,
    gOrAlpha: number,
    b: number,
    a = 255,
  ) {
    if (Array.isArray(props)) {
      this.rgba = props;
      return;
    }

    if (typeof props === "object") {
      this.rgba = [props.r || 0, props.g || 0, props.b || 0, props.a || 255];
      return;
    }

    if (typeof props === "string") {
      this.rgba = hexToRgba(props, gOrAlpha);
      return;
    }

    this.rgba = [props || 0, gOrAlpha, b, a];
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
