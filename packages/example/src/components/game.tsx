import { Scene, SFX } from "@tetragius/jsx-pixi-components";
import { Parallax } from "./parallax";
import { Detective } from "./detective";
import { Component } from "@tetragius/jsx-pixi";
import { ObservablePoint } from "pixi.js";

interface State {
  layers: Array<string[]>;
  layerIdx: number;
}

export class Game extends Component<any, State> {
  constructor(props: any) {
    super(props);
  }

  state = {
    layerIdx: 0,
    layers: [
      ["forest/0.png", "forest/1.png", "forest/2.png", "forest/3.png"],
      [
        "industrial/0.png",
        "industrial/1.png",
        "industrial/2.png",
        "industrial/3.png",
      ],
      [
        "mountain/0.png",
        "mountain/1.png",
        "mountain/2.png",
        "mountain/3.png",
        "mountain/4.png",
      ],
    ],
  };

  animation() {
    this.setState({ layerIdx: (this.state.layerIdx + 0.005) % 3 });
  }

  render() {
    const idx = Math.floor(this.state.layerIdx);
    return (
      <>
        <Scene
          y={this.app.stage.height}
          scale={new ObservablePoint(null, null, 2, 2)}
        >
          <Parallax width={window.innerWidth} layers={this.state.layers[idx]} />
          <Detective x={50} y={-16} />
        </Scene>
        <SFX src="bkg.mp3" repeat />
      </>
    );
  }
}
