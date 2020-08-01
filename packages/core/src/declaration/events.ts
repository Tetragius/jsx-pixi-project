import { InteractionEvent } from "pixi.js";

export interface Events {
  onKeyPress?(e: KeyboardEvent): void;
  onKeyDown?(e: KeyboardEvent): void;
  onKeyUp?(e: KeyboardEvent): void;

  onClick?(e: InteractionEvent): void;
  onMouseUp?(e: InteractionEvent): void;
  onMouseDown?(e: InteractionEvent): void;
  onMouseMove?(e: InteractionEvent): void;
  onMouseOut?(e: InteractionEvent): void;
  onMouseOver?(e: InteractionEvent): void;
  onMouseUpUoutside?(e: InteractionEvent): void;

  onPointerCancel?(e: InteractionEvent): void;
  onPointerDown?(e: InteractionEvent): void;
  onPointerOut?(e: InteractionEvent): void;
  onPointerOver?(e: InteractionEvent): void;
  onPointerTap?(e: InteractionEvent): void;
  onPointerUp?(e: InteractionEvent): void;
  onPointerUpOutside?(e: InteractionEvent): void;

  onRightClick?(e: InteractionEvent): void;
  onRightDown?(e: InteractionEvent): void;
  onRightUp?(e: InteractionEvent): void;
  onRightUpOutside?(e: InteractionEvent): void;

  onTap?(e: InteractionEvent): void;
  onTouchCancel?(e: InteractionEvent): void;
  onTouchEnd?(e: InteractionEvent): void;
  onTouchEndOutside?(e: InteractionEvent): void;
  onTouchMove?(e: InteractionEvent): void;
  onTouchStart?(e: InteractionEvent): void;
}

export type PropsWithEvents<P = any> = P & Events;
