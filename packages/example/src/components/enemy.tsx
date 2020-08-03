import { Sprite, Texture } from "@tetragius/jsx-pixi-components";
import { Component } from "@tetragius/jsx-pixi";

interface Props {
  isHit?: boolean;
  onEndAnimation?: Function;
}

interface State {
  frame: number;
}

export class Enemy extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  state: State = {
    frame: 0,
  };

  animation() {
    if (!this.props.isHit) {
      this.setState({ frame: (this.state.frame + 0.2) % 8 });
    }
    if (this.props.isHit) {
      if (this.state.frame <= 7) {
        this.setState({ frame: 8 });
      }
      this.setState({ frame: (this.state.frame + 0.4) % 17 });
      if (this.state.frame >= 16) {
        this.props.onEndAnimation();
      }
    }
  }

  render() {
    const frame = Math.floor(this.state.frame);
    return (
      <Sprite {...this.props} height={64} width={83}>
        {frame === 0 && <Texture src="sprites/alien-enemy-flying1.png" />}
        {frame === 1 && <Texture src="sprites/alien-enemy-flying2.png" />}
        {frame === 2 && <Texture src="sprites/alien-enemy-flying3.png" />}
        {frame === 3 && <Texture src="sprites/alien-enemy-flying4.png" />}
        {frame === 4 && <Texture src="sprites/alien-enemy-flying5.png" />}
        {frame === 5 && <Texture src="sprites/alien-enemy-flying6.png" />}
        {frame === 6 && <Texture src="sprites/alien-enemy-flying7.png" />}
        {frame === 7 && <Texture src="sprites/alien-enemy-flying8.png" />}
        {frame === 8 && <Texture src="sprites/explosion-animation1.png" />}
        {frame === 9 && <Texture src="sprites/explosion-animation2.png" />}
        {frame === 10 && <Texture src="sprites/explosion-animation3.png" />}
        {frame === 11 && <Texture src="sprites/explosion-animation4.png" />}
        {frame === 12 && <Texture src="sprites/explosion-animation5.png" />}
        {frame === 13 && <Texture src="sprites/explosion-animation6.png" />}
        {frame === 14 && <Texture src="sprites/explosion-animation7.png" />}
        {frame === 15 && <Texture src="sprites/explosion-animation8.png" />}
        {frame === 16 && <Texture src="sprites/explosion-animation9.png" />}
      </Sprite>
    );
  }
}
