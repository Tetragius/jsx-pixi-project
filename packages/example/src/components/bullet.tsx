import { Scene, Sprite, SFX } from "@tetragius/jsx-pixi-components";

export class Bullet extends Scene {
  sfx: any;
  constructor(props: any) {
    super(props);
  }

  render(): void {
    return (
      <Sprite texture="bullet.png" angle={this.props.angle}>
        <SFX ref={(ref) => (this.sfx = ref)} src="shoot.mp3" />
      </Sprite>
    );
  }
}
