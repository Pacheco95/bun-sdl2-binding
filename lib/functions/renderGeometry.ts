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

  const buffer = new ArrayBuffer(vertices.length * 20);
  const view = new DataView(buffer);

  let offset = 0;

  for (const vertex of vertices) {
    view.setFloat32(offset, vertex.position[0], true);
    offset += 4;
    view.setFloat32(offset, vertex.position[1], true);
    offset += 4;
    
    const [r, g, b, a] = vertex.color

    view.setUint8(offset, r);
    offset += 1;
    view.setUint8(offset, g);
    offset += 1;
    view.setUint8(offset, b);
    offset += 1;
    view.setUint8(offset, a);
    offset += 1;

    view.setFloat32(offset, vertex.texCoord[0], true);
    offset += 4;
    view.setFloat32(offset, vertex.texCoord[1], true);
    offset += 4;
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
