import { Scene } from "./scene";

interface RouteProps {
  history?: any;
}

export class Router extends Scene {
  unlisten: any;
  constructor(props: RouteProps) {
    super(props);
  }

  listener = () => this.forceUpdate();

  componentWillMount() {
    this.unlisten = this.props.history.listen(this.listener);
  }

  componentDidUnmount() {
    this.unlisten();
  }

  render() {
    return this.props.children;
  }
}
