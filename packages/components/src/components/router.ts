import { Component } from "@tetragius/jsx-pixi";

interface RouteProps {
  history?: any;
}

export class Router extends Component<RouteProps> {
  unlisten: any;
  constructor(props: RouteProps) {
    super(props);
  }

  listener = () => this.forceUpdate();

  componentWillMount() {
    this.unlisten = this.props.history.listen(this.listener);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return this.props.children;
  }
}
