import { sleep } from "bun";
import { SDL_WINDOW_SHOWN, SDL_CreateWindow } from "./lib/createWindow";
import { SDL_DestroyWindow } from "./lib/destroyWindow";

const window = SDL_CreateWindow("Teste", 0, 0, 800, 600, SDL_WINDOW_SHOWN);

console.log(window);


await sleep(1000)

SDL_DestroyWindow(window!)

await sleep(1000)