import { Container, Text, Ticker, TextStyle } from "pixi.js";
import { eventsFromProps, removeEvents } from "../helpers";
import { ComponentBase, IComponentBaseProps } from "../componentBase";
import { INode } from "../utils";

export interface IComponentProps extends IComponentBaseProps {
  textStyle?: TextStyle;
}

export interface IComponent<P = any, S = any> {
  container: Container;
  ticker?: Ticker;
}

export class Component<P = any, S = any>
  extends ComponentBase<P & IComponentProps, S>
  implements IComponent<P & IComponentProps, S> {
  container: Container = new Container();
  ticker?: Ticker;
  parent?: Component;

  constructor(props: P & IComponentProps) {
    super(props);
    eventsFromProps(this.container, this.props); // add event handlers
    this.container.on("added", () => this.added());
    this.container.on("removed", () => this.removed());
  }

  removeNode(node: INode) {
    const delay = super.removeNode(node);
    if (delay) {
      node.deleteTimer =
        !node.deleteTimer &&
        setTimeout(() => {
          this.container.removeChild(node.instanse.container); // remove node from parent container
          node.deleteTimer = null;
        }, delay);
    } else {
      this.container.removeChild(node.instanse.container); // remove node from parent container
    }
  }

  addNode(node: INode) {
    super.addNode(node);
    if (node.instanse.container) {
      this.container.addChild(node.instanse.container); // append node to parent container
    }
  }

  addTextNode(text: string) {
    const node = {
      instanse: {
        container: new Text(
          text,
          this.props?.textStyle && new TextStyle(this.props.textStyle)
        ),
      },
    };
    this.container.addChild(node.instanse.container); // append node to parent container
    return node;
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
  }

  removed() {
    this.isMounted = false;
    if (this.animation && this.ticker) {
      this.animation && this.ticker.remove(this.animation, this);
      this.ticker.destroy();
    }
    removeEvents(this.props);
    this.container.removeChildren();
    delete this.container;
  }

  animation?(tick: number): void;
  componentDidUnmount?(props: P, state: S): void;
  componentDidMount?(props: P, state: S): void;
}
