import { ptr, read } from "bun:ffi";
import { SDL_PollEvent as foreign } from "../ffi";

export enum SDL_EventType {
  SDL_FIRSTEVENT = 0,

  /* Application events */
  SDL_QUIT = 0x100,

  /* These application events have special meaning on iOS, see README-ios.md for details */
  SDL_APP_TERMINATING,
  SDL_APP_LOWMEMORY,
  SDL_APP_WILLENTERBACKGROUND,
  SDL_APP_DIDENTERBACKGROUND,
  SDL_APP_WILLENTERFOREGROUND,
  SDL_APP_DIDENTERFOREGROUND,
  SDL_LOCALECHANGED,

  /* Display events */
  SDL_DISPLAYEVENT = 0x150,

  /* Window events */
  SDL_WINDOWEVENT = 0x200,
  SDL_SYSWMEVENT,

  /* Keyboard events */
  SDL_KEYDOWN = 0x300,
  SDL_KEYUP,
  SDL_TEXTEDITING,
  SDL_TEXTINPUT,
  SDL_KEYMAPCHANGED,

  /* Mouse events */
  SDL_MOUSEMOTION = 0x400,
  SDL_MOUSEBUTTONDOWN,
  SDL_MOUSEBUTTONUP,
  SDL_MOUSEWHEEL,

  /* Joystick events */
  SDL_JOYAXISMOTION = 0x600,
  SDL_JOYBALLMOTION,
  SDL_JOYHATMOTION,
  SDL_JOYBUTTONDOWN,
  SDL_JOYBUTTONUP,
  SDL_JOYDEVICEADDED,
  SDL_JOYDEVICEREMOVED,

  /* Game controller events */
  SDL_CONTROLLERAXISMOTION = 0x650,
  SDL_CONTROLLERBUTTONDOWN,
  SDL_CONTROLLERBUTTONUP,
  SDL_CONTROLLERDEVICEADDED,
  SDL_CONTROLLERDEVICEREMOVED,
  SDL_CONTROLLERDEVICEREMAPPED,
  SDL_CONTROLLERTOUCHPADDOWN,
  SDL_CONTROLLERTOUCHPADMOTION,
  SDL_CONTROLLERTOUCHPADUP,
  SDL_CONTROLLERSENSORUPDATE,

  /* Touch events */
  SDL_FINGERDOWN = 0x700,
  SDL_FINGERUP,
  SDL_FINGERMOTION,

  /* Gesture events */
  SDL_DOLLARGESTURE = 0x800,
  SDL_DOLLARRECORD,
  SDL_MULTIGESTURE,

  /* Clipboard events */
  SDL_CLIPBOARDUPDATE = 0x900,

  /* Drag and drop events */
  SDL_DROPFILE = 0x1000,
  SDL_DROPTEXT,
  SDL_DROPBEGIN,
  SDL_DROPCOMPLETE,

  /* Audio hotplug events */
  SDL_AUDIODEVICEADDED = 0x1100,
  SDL_AUDIODEVICEREMOVED,

  /* Sensor events */
  SDL_SENSORUPDATE = 0x1200,

  /* Render events */
  SDL_RENDER_TARGETS_RESET = 0x2000,
  SDL_RENDER_DEVICE_RESET,

  /* Internal events */
  SDL_POLLSENTINEL = 0x7f00,
  SDL_USEREVENT = 0x8000,
  SDL_LASTEVENT = 0xffff,
}

export class SDL_Event {
  buffer = new Uint8ClampedArray(56);

  get type(): SDL_EventType {
    return read.u32(ptr(this.buffer), 0);
  }

  get timestamp(): number {
    return read.u32(ptr(this.buffer), 4);
  }
}

export const SDL_PollEvent = (event = new SDL_Event()) => {
  const result = foreign(event.buffer);
  return result == 1 ? event : null;
};
