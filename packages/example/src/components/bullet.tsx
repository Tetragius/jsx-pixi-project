import { Scene, Sprite, SFX } from "@tetragius/jsx-pixi-components";

export class Bullet extends Scene {
  sfx: any;
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Sprite texture="bullet.png" angle={this.props.angle}>
        <SFX src="shoot.mp3" />
      </Sprite>
    );
  }
}
