import { Scene, Sprite } from "@tetragius/jsx-pixi-components";

export class Bullet extends Scene {
  constructor(props: any) {
    super(props);
  }

  render(): void {
    return <Sprite texture="bullet.png" angle={this.props.angle} />;
  }
}