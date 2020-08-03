import { Sprite, Texture } from "@tetragius/jsx-pixi-components";
import { Component } from "@tetragius/jsx-pixi";

interface Props {
  isWalk?: boolean;
  isStay?: boolean;
  isGunIn?: boolean;
  isStayWithGun?: boolean;
  isGunOut?: boolean;
  isPunch?: boolean;
  onEndAnimation?: Function;
}

interface State {
  frame: number;
}

export class Detective extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  state: State = {
    frame: -1,
  };

  animation() {
    if (this.props.isWalk) {
      this.setState({ frame: (this.state.frame + 0.1) % 6 });
      if (this.state.frame >= 5) {
        this.props.onEndAnimation();
      }
    }
    if (this.props.isGunIn) {
      this.setState({ frame: (this.state.frame + 0.1) % 10 });
      if (this.state.frame >= 9) {
        this.props.onEndAnimation();
      }
    }
    if (this.props.isGunOut) {
      this.setState({ frame: this.state.frame - 0.1 });
      if (this.state.frame <= 6) {
        this.props.onEndAnimation();
      }
    }
    if (this.props.isPunch) {
      if (this.state.frame <= 9) {
        this.setState({ frame: 10 });
      }
      this.setState({ frame: (this.state.frame + 0.1) % 14 });
      if (this.state.frame >= 13) {
        this.props.onEndAnimation();
      }
    }
    if (this.props.isStay) {
      this.setState({ frame: 6 });
    }
    if (this.props.isStayWithGun) {
      this.setState({ frame: 9 });
    }
  }

  render() {
    const frame = Math.floor(this.state.frame);
    return (
      <Sprite {...this.props}>
        {frame === 0 && <Texture src="walk/Layer-1.png" />}
        {frame === 1 && <Texture src="walk/Layer-2.png" />}
        {frame === 2 && <Texture src="walk/Layer-3.png" />}
        {frame === 3 && <Texture src="walk/Layer-4.png" />}
        {frame === 4 && <Texture src="walk/Layer-5.png" />}
        {frame === 5 && <Texture src="walk/Layer-6.png" />}
        {frame === 6 && <Texture src="draw gun/Layer-1.png" />}
        {frame === 7 && <Texture src="draw gun/Layer-2.png" />}
        {frame === 8 && <Texture src="draw gun/Layer-3.png" />}
        {frame === 9 && <Texture src="draw gun/Layer-4.png" />}
        {frame === 10 && <Texture src="punch/Layer-1.png" />}
        {frame === 11 && <Texture src="punch/Layer-2.png" />}
        {frame === 12 && <Texture src="punch/Layer-3.png" />}
        {frame === 13 && <Texture src="punch/Layer-4.png" />}
      </Sprite>
    );
  }
}
