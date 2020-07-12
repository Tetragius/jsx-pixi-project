import { Scene, Sprite, Texture } from "jsx-pixi-components";

interface Props {
  onMove?: any;
  onShut?: any;
}

interface FlipState {
  frame: number;
  move: boolean;
}

export class Tank extends Scene<Props, FlipState> {
  state = { frame: 1, move: false };

  constructor(props: any) {
    super(props);

    setInterval(() => {
      if (this.state.move) {
        const frame = this.state.frame === 8 ? 0 : this.state.frame;
        this.setState({ frame: frame + 1 });
      }
    }, 125);
  }

  handleKeyDown = (e: any) => {
    if (this.props.onMove) {
      switch (e.key) {
        case "ArrowLeft":
          this.setState({ move: true });
          this.container.angle = 180;
          this.props.onMove({ x: -1, y: 0 });
          return;
        case "ArrowRight":
          this.setState({ move: true });
          this.container.angle = 0;
          this.props.onMove({ x: 1, y: 0 });
          return;
        case "ArrowDown":
          this.setState({ move: true });
          this.container.angle = 90;
          this.props.onMove({ x: 0, y: 1 });
          return;
        case "ArrowUp":
          this.setState({ move: true });
          this.container.angle = 270;
          this.props.onMove({ x: 0, y: -1 });
          return;
        case " ":
          this.props.onShut({ angle: this.container.angle });
          return;
      }
    }
  };

  handleKeyUp = (e: any) => {
    if (this.props.onMove) {
      this.setState({ move: false });
    }
  };

  render() {
    return (
      <Scene onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
        <Sprite x={0} y={0}>
          {this.state.frame === 1 && <Texture src="tank-1.png" />}
          {this.state.frame === 2 && <Texture src="tank-2.png" />}
          {this.state.frame === 3 && <Texture src="tank-3.png" />}
          {this.state.frame === 4 && <Texture src="tank-4.png" />}
          {this.state.frame === 5 && <Texture src="tank-5.png" />}
          {this.state.frame === 6 && <Texture src="tank-6.png" />}
          {this.state.frame === 7 && <Texture src="tank-7.png" />}
          {this.state.frame === 8 && <Texture src="tank-8.png" />}
        </Sprite>
      </Scene>
    );
  }
}
