import { SDL_SetHint as foreign } from "../ffi.ts";
import { strToPtr } from "../utils/converters.ts";

export const SDL_SetHint = (hint: string, value: string) => {
  return foreign(strToPtr(hint), strToPtr(value)) === 1;
};
