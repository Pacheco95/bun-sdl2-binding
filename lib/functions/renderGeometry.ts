import { SDL_RenderGeometry as foreign } from "../ffi.ts";
import { Pointer, ptr } from "bun:ffi";
import { Vertex } from "../renderer/vertex.ts";
import { DataViewAppender } from "../utils/dataViewAppender.ts";

export const SDL_RenderGeometry = (
  renderer: Pointer,
  texture: Pointer | null,
  vertices: Vertex[],
  indices?: number[],
) => {
  const indicesPointer = indices ? ptr(Int32Array.from(indices!)) : null;
  const numIndices = indices?.length ?? 0;

  const buffer = new ArrayBuffer(vertices.length * 20);
  const appender = new DataViewAppender(new DataView(buffer));

  for (const vertex of vertices) {
    appender
      .setFloat32(vertex.position[0], true)
      .setFloat32(vertex.position[1], true)

      .setNUint8(vertex.color)

      .setFloat32(vertex.texCoord[0], true)
      .setFloat32(vertex.texCoord[1], true);
  }

  const renderResult = foreign(
    renderer,
    texture,
    ptr(buffer),
    vertices.length,
    indicesPointer,
    numIndices,
  );

  return renderResult === 0;
};
