import { Color, CreateColor } from "./color.ts";
import { CreatePoint, Point } from "./point.ts";

export type CreateVertexArray = [CreatePoint, CreateColor, CreatePoint?];
export type CreateVertexFields = {
  position: CreatePoint;
  color: CreateColor;
  texCoord?: CreatePoint;
};
export type CreateVertex = CreateVertexFields | CreateVertexArray | Vertex;

export class Vertex {
  public static readonly SIZE_BYTES = 2 * Point.SIZE_BYTES + Color.SIZE_BYTES;
  #position: Point;
  #color: Color;
  #texCoord: Point;

  constructor(vertex: CreateVertex);
  constructor(
    position: CreatePoint,
    color: CreateColor,
    texCoord?: CreatePoint,
  );
  constructor(
    vertex: CreateVertex | CreatePoint,
    color: CreateColor,
    texCoord: CreatePoint = [0, 0],
  ) {
    let initialValues = this.#computeInitialValues(vertex, color, texCoord);

    this.#position = new Point(initialValues.position);
    this.#color = new Color(initialValues.color);
    this.#texCoord = new Point(initialValues.texCoord);
  }

  get position() {
    return this.#position;
  }

  set position(newPosition: CreatePoint) {
    this.#position = new Point(newPosition);
  }

  get color() {
    return this.#color;
  }

  set color(color: CreateColor) {
    this.#color = new Color(color);
  }

  get texCoord() {
    return this.#texCoord;
  }

  set texCoord(newTexCoord: CreatePoint) {
    this.#texCoord = new Point(newTexCoord);
  }

  get array() {
    return new Uint8ClampedArray([
      ...this.position.array,
      ...this.color.array,
      ...this.texCoord.array,
    ]);
  }

  toJSON() {
    return this.toString();
  }

  #computeInitialValues(
    vertex: CreateVertex | CreatePoint,
    color: CreateColor,
    texCoord: CreatePoint = [0, 0],
  ): CreateVertexFields {
    const isMultipleArgs = !!color;

    if (isMultipleArgs) {
      return {
        position: vertex as CreatePoint,
        color,
        texCoord,
      };
    }

    if (Array.isArray(vertex)) {
      const [position, color, texCoord] = vertex as CreateVertexArray;
      return { position, color, texCoord };
    }

    const vertexFields = vertex as CreateVertexFields;

    return {
      position: vertexFields.position,
      color: vertexFields.color,
      texCoord: vertexFields.texCoord,
    };
  }
}

Vertex.prototype.toString = function () {
  return JSON.stringify({
    position: this.position,
    color: this.color,
    texCoord: this.texCoord,
  });
};
