import { SDL_GetVersion } from "./ffi";

export const getVersion = () => {
  const ptr = new Uint8ClampedArray(3);
  SDL_GetVersion(ptr);

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
