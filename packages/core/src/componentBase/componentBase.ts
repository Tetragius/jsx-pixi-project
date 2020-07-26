import { Application, TextStyle, Text } from "pixi.js";
import { PropsWithEvents } from "../helpers";
import { createFragment } from "../utils";

export type PropsWithChildren<P = any> = P & {
  children?: any;
  ref?: (ref?: ComponentBase) => void | { current: ComponentBase };
};

export interface IComponentBase<P = any, S = any> {
  props: PropsWithEvents<PropsWithChildren<P>>;
  state: S;
  parent?: ComponentBase;
  app: Application;
  isMounted: boolean;
  setState(state: Partial<S>): void;
}

export class ComponentBase<P = any, S = any> implements IComponentBase<P, S> {
  static type = Symbol("component");

  isMounted: boolean = false;

  parent?: ComponentBase;
  app: Application;

  #prevChildren: any[] = [];

  props: PropsWithEvents<PropsWithChildren<P>>;
  state: S;

  constructor(props: PropsWithEvents<PropsWithChildren<P>>) {
    this.props = props;

    if (this.props.ref) {
      if (typeof this.props.ref === "function") {
        this.props.ref(this);
      } else if ("current" in this.props.ref) {
        (this.props.ref as any).current = this;
      } else {
        throw "ref must be a function or object like {current: Container}";
      }
    }
  }

  removeNode(node: any) {
    node.children?.forEach((child: any) => child.instanse?.removeNode(child));
    node.instanse.isMounted = false;
    return node?.instanse?.componentWillUnmount
      ? node.instanse.componentWillUnmount(node.props)
      : 0; // call componentWillUnmount
  }

  addNode(node: any) {
    node.instanse = new node.type(node.props); // create node by type
    node.instanse.parent = this; // link to parent
    node.instanse.app = this.app; // link to application
    node.instanse.componentWillMount &&
      node.instanse.componentWillMount(node.props); // call componentWillMount
  }

  addTextNode(node: any) {}

  update(props = this.props) {
    this.props = props; // update props
    const rendered = this.render && this.render(); // render node

    let children =
      rendered?.type === createFragment ? [rendered.children] : [rendered]; // get children node
    children = (children as any).flat(3);

    const temp: any[] = []; // temporary rendered nods

    // loop
    for (const idx in children) {
      if (!this.isMounted) {
        return this;
      }

      let child = children[idx];

      // if node is empty or false
      if (!child) {
        child = { instanse: null };
      }

      // if node is a text
      if (typeof child === "string") {
        child = this.addTextNode(child);
      }

      child.key = child?.props?.key ?? idx;
      const old = this.#prevChildren.find((o) => o.key === child.key); // if exists prev render step node

      // if node exist on prev step but not now
      // use getChildIndex
      if (old?.instanse && !child?.type) {
        this.removeNode(old);
      }

      // if prev step node not exists
      if (!old?.instanse && child?.type?.type === ComponentBase.type) {
        this.addNode(child);
      }

      // if prev step node and current node exists
      if (
        old?.instanse &&
        child?.type?.type === ComponentBase.type &&
        old.key === child.key
      ) {
        old?.instanse?.componentWillUpdate &&
          old.instanse.componentWillUpdate(child.props); // call componentWillUpdate
        child.instanse = old.instanse.update(child.props); // update node
      }

      temp.push(child); // temp prevrender array
    }

    for (const old of this.#prevChildren) {
      if (!temp.find((tmp) => tmp.key === old.key)) {
        this.removeNode(old);
      }
    }

    this.#prevChildren = temp; // update prevRender for next step

    this.componentDidUpdate && this.componentDidUpdate(props, this.state); // call componentDidUpdate
    return this; // return self
  }

  // update state and rerender
  setState(newState: Partial<S>) {
    if (this.state !== newState) {
      this.state = { ...this.state, ...newState };
      this.update();
    }
  }

  // update and rerender
  forceUpdate() {
    this.update();
  }

  componentWillMount?(props: P): void;
  componentDidMount?(props: P, state: S): void;
  componentWillUpdate?(props: P, state: S): void;
  componentDidUpdate?(props: P, state: S): void;
  componentWillUnmount?(props: P): void;
  componentDidUnmount?(props: P, state: S): void;
  render?(): any;
}
