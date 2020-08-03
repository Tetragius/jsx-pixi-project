import { Scene, SFX } from "@tetragius/jsx-pixi-components";
import { Parallax } from "./parallax";
import { Detective } from "./detective";
import { Component } from "@tetragius/jsx-pixi";
import { ObservablePoint } from "pixi.js";
import { Enemy } from "./enemy";

interface State {
  layers: Array<string[]>;
  layerIdx: number;
  isWalk?: boolean;
  isStay?: boolean;
  isGunIn?: boolean;
  isGunInRequest?: boolean;
  isStayWithGun?: boolean;
  isGunOut?: boolean;
  isPunch?: boolean;
  isPunchRequest?: boolean;
  enemyX?: number;
  isEnemyHit?: boolean;
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
    isStay: false,
    isWalk: true,
    isGunIn: false,
    isGunInRequest: false,
    isGunOut: false,
    isStayWithGun: false,
    isPunchRequest: false,
    isPunch: false,
    enemyX: 500,
    isEnemyHit: false,
  };

  animation() {
    // this.setState({
    //   layerIdx: (this.state.layerIdx + 0.005) % 3,
    // });
    this.setState({
      enemyX: this.state.enemyX >= 0 ? this.state.enemyX - 2 : 500,
    });
  }

  handleClick = () => {
    // if (this.state.isStay) {
    //   this.setState({ isWalk: true, isStay: false });
    //   return;
    // }
    if (this.state.isWalk) {
      this.setState({ isPunch: true, isWalk: false });
      return;
    }
    // if (this.state.isStayWithGun) {
    //   this.setState({ isStayWithGun: false, isGunOut: true });
    //   return;
    // }
  };

  handleAnimationEnd = () => {
    // if (this.state.isGunInRequest) {
    //   this.setState({ isGunIn: true, isWalk: false, isGunInRequest: false });
    //   return;
    // }
    // if (this.state.isPunchRequest) {
    //   this.setState({ isPunch: true, isWalk: false, isPunchRequest: false });
    //   return;
    // }
    // if (this.state.isGunIn) {
    //   this.setState({ isStayWithGun: true, isGunIn: false });
    //   return;
    // }
    // if (this.state.isGunOut) {
    //   this.setState({ isStay: true, isGunOut: false });
    //   return;
    // }
    if (this.state.isPunch) {
      if (this.state.enemyX < 150 && this.state.enemyX > 100) {
        this.setState({ isEnemyHit: true });
      }
      this.setState({ isWalk: true, isPunch: false });
      return;
    }
  };

  handleAnimationEndEnemy = () => {
    this.setState({ isEnemyHit: false, enemyX: 500 });
  };

  render() {
    const idx = Math.floor(this.state.layerIdx);
    return (
      <>
        <Scene
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          y={this.app.stage.height}
          height={800}
          scale={new ObservablePoint(null, null, 2, 2)}
        >
          <Parallax
            move={this.state.isWalk}
            width={window.innerWidth}
            layers={this.state.layers[2]}
          />
          <Detective
            isStay={this.state.isStay}
            isWalk={this.state.isWalk}
            isGunIn={this.state.isGunIn}
            isGunOut={this.state.isGunOut}
            isPunch={this.state.isPunch}
            isStayWithGun={this.state.isStayWithGun}
            onEndAnimation={this.handleAnimationEnd}
            x={100}
            y={-16}
          />
          <Enemy
            isHit={this.state.isEnemyHit}
            onEndAnimation={this.handleAnimationEndEnemy}
            x={this.state.enemyX}
            y={-35}
          />
        </Scene>
        <SFX src="bkg.mp3" repeat />
      </>
    );
  }
}
