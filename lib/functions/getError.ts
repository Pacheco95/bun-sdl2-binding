import { SDL_GetError as foreign } from "../ffi";

export const SDL_GetError = foreign;
