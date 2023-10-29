import process, { exit } from "process";
import {
  SDL_CreateRenderer,
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_Init,
  SDL_INIT_EVERYTHING,
  SDL_PollEvent,
  SDL_Quit,
  SDL_RenderClear,
  SDL_RENDERER_ACCELERATED,
  SDL_RENDERER_PRESENTVSYNC,
  SDL_RenderGeometry,
  SDL_SetRenderDrawColor,
  SDL_WINDOWPOS_CENTERED,
} from "./lib/functions";
import { SDL_Event } from "./lib/events/event.ts";
import { SDL_EventType } from "./lib/events/eventType.ts";
import { KeyCode } from "./lib/events/keyboard/KeyCode.ts";
import { Vertex } from "./lib/renderer/vertex.ts";
import { SDL_DestroyRenderer, SDL_RenderPresent } from "./lib/ffi.ts";

const SDL_Log = console.log;

SDL_Log("Process ID:", process.pid);

if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
  SDL_Log("Failed to initialize SDL:", SDL_GetError());
  exit(1);
}

const window = SDL_CreateWindow(
  "I'm talking to you through Bun 🚀",
  SDL_WINDOWPOS_CENTERED,
  SDL_WINDOWPOS_CENTERED,
  800,
  600,
);

if (!window) {
  SDL_Log("Failed to create window:", SDL_GetError());
  SDL_Quit();
  exit(1);
}

const renderer = SDL_CreateRenderer(
  window,
  -1,
  SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC,
);

if (!renderer) {
  SDL_Log("Failed to create renderer:", SDL_GetError());
  SDL_Quit();
  exit(1);
}

const vertices = [
  new Vertex({
    position: [400, 150],
    color: [255, 0, 0, 255],
  }),

  new Vertex({
    position: [200, 450],
    color: [0, 0, 255, 255],
  }),

  new Vertex({
    position: [600, 450],
    color: [0, 255, 0, 255],
  }),
];

let running = true;

while (running) {
  let event: SDL_Event;

  while ((event = SDL_PollEvent()!)) {
    if (event.type === SDL_EventType.SDL_QUIT) {
      running = false;
    }

    if (event.type === SDL_EventType.SDL_KEYDOWN) {
      if (event.key.keysym.sym == KeyCode.SDLK_ESCAPE) {
        running = false;
      }
    }
  }

  if (!SDL_SetRenderDrawColor(renderer!, 0, 0, 0, 255)) {
    SDL_Log(SDL_GetError());
  }

  if (!SDL_RenderClear(renderer!)) {
    SDL_Log(SDL_GetError());
  }

  if (!SDL_RenderGeometry(renderer!, null, vertices)) {
    SDL_Log(SDL_GetError());
  }

  SDL_RenderPresent(renderer);

  const error = SDL_GetError();

  if (error.length > 0) {
    SDL_Log(`'${error}'`);
  }
}

SDL_DestroyRenderer(renderer);
SDL_Log(SDL_GetError());

SDL_DestroyWindow(window);
SDL_Log(SDL_GetError());

SDL_Quit();
