import { SDL_GetVersion as foreign } from "../ffi";

export const SDL_GetVersion = () => {
  const ptr = new Uint8ClampedArray(3);
  foreign(ptr);

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
