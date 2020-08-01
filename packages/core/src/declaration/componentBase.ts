import { Application } from "pixi.js";
import { PropsWithEvents, INode } from ".";

export type IComponentBaseProps<P = any> = P & {
  key?: string;
  children?: JSX.Element[] | JSX.Element | null | false;
  ref?: (ref?: IComponentBase) => void | { current: IComponentBase };
};

export interface IComponentBase<P = any, S = any, T = any> {
  prevChildren: INode[];
  props: PropsWithEvents<IComponentBaseProps<P>>;
  state: S;
  parent?: IComponentBase & T;
  app: Application;
  isMounted: boolean;
  setState(state: Partial<S>): void;
  forceUpdate(): void;
  update(props: P): IComponentBase;
  addNode(node: INode): void;
  addTextNode?(node: string): INode;
  removeNode(node: INode): number;
  componentWillMount?(props: P): void;
  componentWillUpdate?(props: P, state: S): void;
  componentShouldUpdate?(props: P, state: S): boolean;
  componentDidUpdate?(props: P, state: S): void;
  componentWillUnmount?(props: P): number | void;
  render?(): JSX.Element[] | JSX.Element | null | false;
}
