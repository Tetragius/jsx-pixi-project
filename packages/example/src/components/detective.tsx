import { Sprite, Texture } from "@tetragius/jsx-pixi-components";
import { Component } from "@tetragius/jsx-pixi";

interface State {
  frame: number;
}

export class Detective extends Component<any, State> {
  constructor(props: any) {
    super(props);
  }

  state: State = { frame: 2 };

  animation() {
    this.setState({ frame: (this.state.frame + 0.1) % 6 });
  }

  render() {
      const frame = Math.floor(this.state.frame) ;
    return (
      <Sprite {...this.props}>
        {frame === 0 && <Texture src="walk/Layer-1.png" />}
        {frame === 1 && <Texture src="walk/Layer-2.png" />}
        {frame === 2 && <Texture src="walk/Layer-3.png" />}
        {frame === 3 && <Texture src="walk/Layer-4.png" />}
        {frame === 4 && <Texture src="walk/Layer-5.png" />}
        {frame === 5 && <Texture src="walk/Layer-6.png" />}
      </Sprite>
    );
  }
}
