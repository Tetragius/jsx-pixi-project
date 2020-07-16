import { Container, InteractionEvent } from "pixi.js";

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

export const eventsFromProps = (container: Container, props: Events) => {
  // keyboard
  if (props.onKeyPress) {
    document.body.addEventListener("keypress", props.onKeyPress);
  }
  if (props.onKeyDown) {
    document.body.addEventListener("keydown", props.onKeyDown);
  }
  if (props.onKeyUp) {
    document.body.addEventListener("keyup", props.onKeyUp);
  }
  // moouse
  if (props.onClick) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("click", props.onClick);
  }
  if (props.onMouseDown) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("mousedown", props.onMouseDown);
  }
  if (props.onMouseUp) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("mouseup", props.onMouseUp);
  }
  if (props.onMouseMove) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("mousemove", props.onMouseMove);
  }
  if (props.onMouseOut) {
    container.buttonMode = true;
    container.interactive = true;
    container.on("mouseout", props.onMouseOut);
  }
  if (props.onMouseOver) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("mouseover", props.onMouseOver);
  }
  if (props.onMouseUpUoutside) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("mouseupoutside", props.onMouseUpUoutside);
  }
  if (props.onPointerCancel) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointercancel", props.onPointerCancel);
  }
  if (props.onPointerDown) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointerdown", props.onPointerDown);
  }
  if (props.onPointerOut) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointerout", props.onPointerOut);
  }
  if (props.onPointerOver) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointerover", props.onPointerOver);
  }
  if (props.onPointerTap) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointertap", props.onPointerTap);
  }
  if (props.onPointerUp) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointerup", props.onPointerUp);
  }
  if (props.onPointerUpOutside) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("pointerupoutside", props.onPointerUpOutside);
  }
  if (props.onRightClick) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("rightclick", props.onRightClick);
  }
  if (props.onRightDown) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("rightdown", props.onRightDown);
  }
  if (props.onRightUp) {
    container.buttonMode = true;
    container.interactive = true;
    container.on("rightup", props.onRightUp);
  }
  if (props.onRightUpOutside) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("rightupoutside", props.onRightUpOutside);
  }
  if (props.onTap) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("tap", props.onTap);
  }
  if (props.onTouchCancel) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("touchcancel", props.onTouchCancel);
  }
  if (props.onTouchEnd) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("touchend", props.onTouchEnd);
  }
  if (props.onTouchEndOutside) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("touchendoutside", props.onTouchEndOutside);
  }
  if (props.onTouchMove) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("touchmove", props.onTouchMove);
  }
  if (props.onTouchStart) {
    container.interactive = true;
    container.buttonMode = true;
    container.on("touchstart", props.onTouchStart);
  }
};

export const removeEvents = (props: Events) => {
  // keyboard
  if (props?.onKeyPress) {
    document.body.removeEventListener("keypress", props?.onKeyPress);
  }
  if (props?.onKeyDown) {
    document.body.removeEventListener("keydown", props?.onKeyDown);
  }
  if (props?.onKeyUp) {
    document.body.removeEventListener("keyup", props?.onKeyUp);
  }
};
