import { Component } from "@tetragius/jsx-pixi";
import { Filter } from "pixi.js";

type Pivot = {
  x?: number;
  y?: number;
};

interface SceneProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  pivot?: Pivot;
  filters?: Filter[];
}

export class Scene<P = any, S = any> extends Component<P & SceneProps, S> {
  constructor(props: P & SceneProps) {
    super(props);
    this.container.filters = this.props.filters || [];
  }

  componentWillMount() {
    this.container.x = this.props.x ?? 0;
    this.container.y = this.props.y ?? 0;
    this.container.width = this.props.width ?? this.app.stage.width;
    this.container.height = this.props.height ?? this.app.stage.height;
    this.container.pivot.x = this.props.pivot?.x ?? this.container.width / 2;
    this.container.pivot.y = this.props.pivot?.y ?? this.container.height / 2;
  }

  componentWillUpdate(props: SceneProps) {
    this.container.filters = [
      ...this.container.filters,
      ...(props.filters || []),
    ];
    this.container.x = props.x ?? 0;
    this.container.y = props.y ?? 0;
  }

  render() {
    return this.props.children;
  }
}
