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
import { KeyCode, SDL_Event, SDL_EventType } from "./lib/events";
import { Color, Point, Vertex } from "./lib/renderer";
import {
  SDL_DestroyRenderer,
  SDL_GetPerformanceCounter,
  SDL_GetPerformanceFrequency,
  SDL_RenderPresent,
} from "./lib/ffi.ts";
import { SDL_SetHint } from "./lib/functions/setHint.ts";
import { SDL_HINT_RENDER_SCALE_QUALITY } from "./lib/hints.ts";

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

const createEquilateralTriangle = (pivot: Point, size: number) => {
  const { x, y } = pivot;
  const { sqrt } = Math;

  return [
    new Vertex([x, y + size], Color.RED),
    new Vertex([x - (sqrt(3) / 2) * size, y - size / 2], Color.GREEN),
    new Vertex([x + (sqrt(3) / 2) * size, y - size / 2], Color.BLUE),
  ];
};

SDL_Log(`Process ID: ${process.pid}`);

if (SDL_Init(SDL_INIT_EVERYTHING) !== 0) {
  abort("Failed to initialize SDL");
}

const SCREEN_W = 800;
const SCREEN_H = 600;
const window = SDL_CreateWindow(
  "I'm talking to you through Bun FFI 🚀",
  SDL_WINDOWPOS_CENTERED,
  SDL_WINDOWPOS_CENTERED,
  SCREEN_W,
  SCREEN_H,
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

if (!SDL_SetHint(SDL_HINT_RENDER_SCALE_QUALITY, "1")) {
  console.error("Failed to set linear filtering");
}

const screenCenter = new Point(SCREEN_W / 2, SCREEN_H / 2);
const triangle = createEquilateralTriangle(screenCenter, 250);
const rotationDegrees = 50;

let running = true;
let last = Number(SDL_GetPerformanceCounter());
let deltaTime = 0;

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

  const degrees = rotationDegrees * deltaTime;
  const toOrigin = new Point(-screenCenter.x, -screenCenter.y);
  triangle.forEach(({ position }) => position.translated(toOrigin));
  triangle.forEach(({ position }) => position.rotated(degrees));
  triangle.forEach(({ position }) => position.translated(screenCenter));

  SDL_SetRenderDrawColor(renderer!, 0, 0, 0, 255);
  SDL_RenderClear(renderer!);
  SDL_RenderGeometry(renderer!, null, triangle);
  SDL_RenderPresent(renderer);

  logError();

  const now = Number(SDL_GetPerformanceCounter());
  deltaTime = (now - last) / Number(SDL_GetPerformanceFrequency());
  last = now;
}

SDL_DestroyRenderer(renderer);
SDL_DestroyWindow(window);
SDL_Quit();
