import { Scene } from "@tetragius/jsx-pixi-components";

export class Screen extends Scene {
  k = 1;
  constructor(props: any) {
    super(props);
  }

  animation(tick: number) {
    if (this.container.alpha >= 0 && this.container.alpha <= 1) {
      this.container.alpha += 0.01 * tick * this.k;
    } else {
      this.ticker.stop();
    }
  }

  componentDidMount() {
    this.k = 1;
    this.container.alpha = 0;
  }

  componentWillUnmount() {
    this.k = -1;
    this.container.alpha = 1;
    this.ticker.start();
    return 2000;
  }

  render() {
    return this.props.children;
  }
}
