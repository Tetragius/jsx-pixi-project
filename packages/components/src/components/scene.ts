import { Component } from "@tetragius/jsx-pixi";
import { Container } from "pixi.js";
import { setExternalProps } from "../utils/setExternalProps";

interface SceneProps extends Partial<Omit<Container, "children" | "anchor">> {
  anchor?: number;
}

export class Scene<P = any, S = any> extends Component<P & SceneProps, S> {
  constructor(props: P & SceneProps) {
    super(props);
    this.container.filters = this.props.filters || [];
  }

  componentWillMount() {
    setExternalProps(this.container, this.props);
    this.container.x = this.props.x ?? 0;
    this.container.y = this.props.y ?? 0;
    this.container.width = this.props.width ?? this.app.stage.width;
    this.container.height = this.props.height ?? this.app.stage.height;
    this.container.pivot.x = this.props.pivot?.x ?? this.container.width / 2;
    this.container.pivot.y = this.props.pivot?.y ?? this.container.height / 2;
  }

  componentWillUpdate(props: SceneProps & P) {
    setExternalProps(this.container, props);
    this.container.filters = [
      ...(this.container.filters || []),
      ...(props.filters || []),
    ];
    this.container.x = props.x ?? 0;
    this.container.y = props.y ?? 0;
  }

  render() {
    return this.props.children;
  }
}
