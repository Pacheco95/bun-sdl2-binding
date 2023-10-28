import process, { exit } from "process";
import {
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_INIT_VIDEO,
  SDL_Init,
  SDL_PollEvent,
  SDL_Quit,
  SDL_WINDOWPOS_CENTERED,
} from "./lib/functions";
import { SDL_Event } from "./lib/events/event.ts";
import { SDL_EventType } from "./lib/events/eventType.ts";
import { KeyCode } from "./lib/events/keyboard/KeyCode.ts";
import { Vertex } from "./lib/renderer/vertex.ts";

const SDL_Log = console.log;

SDL_Log("Process ID:", process.pid);

if (SDL_Init(SDL_INIT_VIDEO) != 0) {
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

const verts = [
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

SDL_Log(JSON.stringify(verts));
SDL_Log(verts);

gameLoop: while (true) {
  let event: SDL_Event;

  while ((event = SDL_PollEvent()!)) {
    if (event.type === SDL_EventType.SDL_QUIT) {
      break gameLoop;
    }

    if (event.type === SDL_EventType.SDL_KEYDOWN) {
      if (event.key.keysym.sym == KeyCode.SDLK_ESCAPE) {
        break gameLoop;
      }
    }
  }
}

SDL_DestroyWindow(window);
SDL_Log(SDL_GetError());

SDL_Quit();
