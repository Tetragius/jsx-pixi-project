import { Component } from "@tetragius/jsx-pixi";

interface RouteProps {
  path?: string;
}

export class Route extends Component {
  constructor(props: RouteProps) {
    super(props);
  }

  render() {
    return `#${this.props.path}` === location.hash && this.props.children;
  }
}
