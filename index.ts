import process, { exit } from "process";
import {
  SDL_CreateRenderer,
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_GetError,
  SDL_Init,
  SDL_INIT_EVERYTHING,
  SDL_Log,
  SDL_LogCategory,
  SDL_LogCritical,
  SDL_LogError,
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
import { Color } from "./lib/renderer/color.ts";

function logError(category = SDL_LogCategory.SDL_LOG_CATEGORY_APPLICATION) {
  const error = SDL_GetError();

  if (error.length > 0) {
    SDL_LogError(category, error);
  }
}

const abort = (
  errorMessage?: string,
  category = SDL_LogCategory.SDL_LOG_CATEGORY_APPLICATION,
) => {
  SDL_LogCritical(category, `${errorMessage} ${SDL_GetError()}`);
  exit(1);
};

SDL_Log(`Process ID: ${process.pid}`);

if (SDL_Init(SDL_INIT_EVERYTHING) !== 0) {
  abort("Failed to initialize SDL");
}

const window = SDL_CreateWindow(
  "I'm talking to you through Bun FFI 🚀",
  SDL_WINDOWPOS_CENTERED,
  SDL_WINDOWPOS_CENTERED,
  800,
  600,
);

if (!window) {
  abort("Failed to create window", SDL_LogCategory.SDL_LOG_CATEGORY_VIDEO);
}

const renderer = SDL_CreateRenderer(
  window!,
  -1,
  SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC,
);

if (!renderer) {
  abort("Failed to create renderer", SDL_LogCategory.SDL_LOG_CATEGORY_RENDER);
}

const vertices = [
  new Vertex([400, 150], Color.RED),
  new Vertex([200, 450], Color.GREEN),
  new Vertex([600, 450], Color.BLUE),
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

  SDL_SetRenderDrawColor(renderer!, 0, 0, 0, 255);
  SDL_RenderClear(renderer!);
  SDL_RenderGeometry(renderer!, null, vertices);
  SDL_RenderPresent(renderer);

  logError();
}

SDL_DestroyRenderer(renderer);
SDL_DestroyWindow(window);
SDL_Quit();
