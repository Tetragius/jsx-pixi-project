import { Container, Text, Ticker, Application } from "pixi.js";
import { eventsFromProps, removeEvents, PropsWithEvents } from "../helpers";

export type PropsWithChildren<P = any> = P & {
  children?: any;
  ref?: (ref?: Container) => void | { current: Container };
};

export interface IComponent<P = any, S = any> {
  props: PropsWithEvents<PropsWithChildren<P>>;
  state: S;
  container: Container;
  setState(state: Partial<S>): void;
}

export class Component<P = any, S = any> implements IComponent<P, S> {
  static type = Symbol("component");

  isMounted: boolean = false;

  parent?: Container;
  app: Application;

  container: Container = new Container();
  ticker: Ticker;

  #prevChildren: any[] = [];

  props: PropsWithEvents<PropsWithChildren<P>>;
  state: S;

  constructor(props: PropsWithEvents<PropsWithChildren<P>>) {
    this.props = props;

    eventsFromProps(this.container, this.props); // add event handlers

    this.container.on("added", () => this.added());
    this.container.on("removed", () => this.removed());
  }

  added() {
    this.isMounted = true;
    this.update();
    if (this.animation) {
      this.ticker = new Ticker();
      this.ticker.autoStart = true;
      this.ticker.add(this.animation, this);
    }
    this.componentDidMount && this.componentDidMount(this.props, this.state);

    if (this.props.ref) {
      if (typeof this.props.ref === "function") {
        this.props.ref(this.container);
      } else if ("current" in this.props.ref) {
        (this.props.ref as any).current = this.container;
      } else {
        throw "ref must be a function or object like {current: Container}";
      }
    }
  }

  removed() {
    this.isMounted = false;
    this.componentDidUnmount &&
      this.componentDidUnmount(this.props, this.state);
    if (this.animation && this.ticker) {
      this.animation && this.ticker.remove(this.animation, this);
      this.ticker.destroy();
    }
    removeEvents(this.props);
    this.container.removeChildren();
    delete this.container;
  }

  update(props = this.props) {
    this.props = props; // update props
    const rendered = this.render(); // render node

    let children = // get children node
      rendered?.type?.type === Component.type
        ? [rendered]
        : rendered?.children || rendered?.props?.children || props?.children;

    children = children.flat(2);

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
        const text = child;
        child = {};
        child.instanse = { container: new Text(text) };
        this.container.addChild(child.instanse.container);
      }

      child.key = child?.props?.key ?? idx;
      const old = this.#prevChildren.find((o) => o.key === child.key); // if exists prev render step node

      // if node exist on prev step but not now
      // use getChildIndex
      if (old?.instanse?.container && !child?.type) {
        old.instanse.isMounted = false;
        if (old?.instanse?.componentWillUnmount) {
          const delay = old.instanse.componentWillUnmount(old.props); // call componentWillUnmount
          old.deleteTimer =
            !old.deleteTimer &&
            setTimeout(() => {
              const index = this.container.getChildIndex(
                old.instanse.container
              ); // get prev step node index position in container
              this.container.removeChildAt(index);
              old.deleteTimer = null;
              delete old.instanse;
            }, delay || 0);
        } else {
          const index = this.container.getChildIndex(old.instanse.container); // get prev step node index position in container
          this.container.removeChildAt(index); // remove node from parent container
          delete old.instanse;
        }
      }

      // if prev step node not exists
      if (!old?.instanse && child?.type?.type === Component.type) {
        child.instanse = new child.type(child.props); // create node by type
        child.instanse.parent = this.container; // link to parent
        child.instanse.app = this.app; // link to application
        child.instanse.componentWillMount &&
          child.instanse.componentWillMount(child.props); // call componentWillMount
        this.container.addChild(child.instanse.container); // append node to parent container
      }

      // if prev step node and current node exists
      if (
        old?.instanse?.container &&
        child?.type?.type === Component.type &&
        old.key === child.key
      ) {
        old?.instanse?.componentWillUpdate &&
          old.instanse.componentWillUpdate(child.props); // call componentWillUpdate
        child.instanse = old.instanse.update(child.props); // update node
      }

      temp.push(child); // temp prevrender array
    }

    // TODO need refactor cos copy of line 115, need for clean removed nodes
    for (const old of this.#prevChildren) {
      if (!temp.find((tmp) => tmp.key === old.key)) {
        old.instanse.isMounted = false;
        if (old?.instanse?.componentWillUnmount) {
          const delay = old.instanse.componentWillUnmount(old.props); // call componentWillUnmount
          old.deleteTimer =
            !old.deleteTimer &&
            setTimeout(() => {
              const index = this.container.getChildIndex(
                old.instanse.container
              ); // get prev step node index position in container
              this.container.removeChildAt(index);
              old.deleteTimer = null;
              delete old.instanse;
            }, delay || 0);
        } else {
          const index = this.container.getChildIndex(old.instanse.container); // get prev step node index position in container
          this.container.removeChildAt(index); // remove node from parent container
          delete old.instanse;
        }
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

  componentWillMount?(props: P): void;
  componentDidMount?(props: P, state: S): void;
  componentWillUpdate?(props: P, state: S): void;
  componentDidUpdate?(props: P, state: S): void;
  componentWillUnmount?(props: P): void;
  componentDidUnmount?(props: P, state: S): void;
  animation?(tick: number): void;
  render?(): any;
}
