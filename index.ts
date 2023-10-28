import { ptr, read } from "bun:ffi";
import { exit } from "process";
import {
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_EventType,
  SDL_GetError,
  SDL_INIT_VIDEO,
  SDL_Init,
  SDL_PollEvent,
  SDL_Quit,
  SDL_WINDOWPOS_CENTERED,
} from "./lib/functions";

const SDL_Log = console.log;

// Initialize SDL
if (SDL_Init(SDL_INIT_VIDEO) != 0) {
  SDL_Log("Failed to initialize SDL: ", SDL_GetError());
  exit(1);
}

// Create a window
const window = SDL_CreateWindow(
  "Blank Window",
  SDL_WINDOWPOS_CENTERED,
  SDL_WINDOWPOS_CENTERED,
  800,
  600,
  0
);
if (!window) {
  SDL_Log("Failed to create window: %s", SDL_GetError());
  SDL_Quit();
  exit(1);
}

// Main loop
let quit = false;
let event = new Uint8ClampedArray(56);

while (!quit) {
  while (SDL_PollEvent(event)) {
    const eventType = read.u32(ptr(event), 0);
    // console.log(eventType, eventType.toString(16));

    if (eventType === SDL_EventType.SDL_QUIT) {
      quit = true;
    }
    // if (event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE) {
    //   quit = true;
    // }
  }
}

// Cleanup and exit
SDL_DestroyWindow(window);
SDL_Quit();
