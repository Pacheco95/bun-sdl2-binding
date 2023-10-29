import { SDL_RenderGeometry as foreign } from "../ffi.ts";
import { Pointer, ptr } from "bun:ffi";
import { Vertex } from "../renderer/vertex.ts";

export const SDL_RenderGeometry = (
  renderer: Pointer,
  texture: Pointer | null,
  vertices: Vertex[],
  indices?: number[],
) => {
  const indicesPointer = indices ? ptr(Int32Array.from(indices!)) : null;
  const numIndices = indices?.length ?? 0;

  const verticesPointer = new Uint8Array(vertices.length * Vertex.SIZE_BYTES);

  let offset = 0;

  for (let vertex of vertices) {
    verticesPointer.set(vertex.array, offset);
    offset += Vertex.SIZE_BYTES;
  }

  const renderResult = foreign(
    renderer,
    texture,
    ptr(verticesPointer),
    vertices.length,
    indicesPointer,
    numIndices,
  );

  return renderResult === 0;
};
