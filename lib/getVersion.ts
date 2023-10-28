import { SDL_GetVersion as forward } from "./ffi";

export const SDL_GetVersion = () => {
  const ptr = new Uint8ClampedArray(3);
  forward(ptr);

  const version = {
    major: ptr[0],
    minor: ptr[1],
    patch: ptr[2],

    get [Symbol.toStringTag]() {
      return `${this.major}.${this.minor}.${this.patch}`;
    },
  };

  return version;
};
