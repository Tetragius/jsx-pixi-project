import { IComponentBaseProps } from ".";
import { TextStyle, Container, Ticker } from "pixi.js";
import { IComponentBase } from "./componentBase";

export interface IComponentProps extends IComponentBaseProps {
  textStyle?: TextStyle;
}

export interface IComponent<P = any, S = any>
  extends IComponentBase<P, S, IComponent> {
  container: Container;
  ticker?: Ticker;
  animation?(tick: number): void;
  componentDidUnmount?(props: P, state: S): void;
  componentDidMount?(props: P, state: S): void;
}
