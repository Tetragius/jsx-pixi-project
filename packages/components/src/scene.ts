import { Component, PropsWithChildren } from "jsx-pixi";
import { Filter } from ".";

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

const filterFromChildren = (children?: any) => {
  if (!children) {
    return null;
  }
  const filters = children.filter((c: any) => c.type === Filter);
  return filters.map((f: any) => new f.type(f.props).filter);
};

export class Scene<P = any, S = any> extends Component<P & SceneProps, S> {
  constructor(props: P & SceneProps) {
    super(props);
    this.container.x = this.props.x ?? 0;
    this.container.y = this.props.y ?? 0;
    this.container.width = this.props.width;
    this.container.height = this.props.height;
    this.container.pivot.x = this.props.pivot?.x ?? this.container.width / 2;
    this.container.pivot.y = this.props.pivot?.y ?? this.container.height / 2;
    this.container.filters =
      this.props.filters || filterFromChildren(this.props.children);
  }

  componentWillUpdate(props: PropsWithChildren<SceneProps>) {
    this.container.filters =
      props.filters || filterFromChildren(props.children);
    this.container.x = props.x ?? 0;
    this.container.y = props.y ?? 0;
  }

  render() {
    return this.props.children;
  }
}
