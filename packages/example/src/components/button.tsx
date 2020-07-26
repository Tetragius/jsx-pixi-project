import { Scene, Sprite, Filter } from "@tetragius/jsx-pixi-components";

export class Button extends Scene {
  state = { over: false };

  constructor(props: any) {
    super(props);
    this.container.buttonMode = true;
  }

  mouseOverHander = () => this.setState({ over: true });
  mouseOutHandler = () => this.setState({ over: false });

  render() {
    return (
      <Sprite
        texture="button.png"
        onMouseOver={this.mouseOverHander}
        onMouseOut={this.mouseOutHandler}
      >
        {!this.state.over && (
          <Filter builtIn="BlurFilter" builtInArgs={[0.5]} />
        )}
        <Scene x={-30} y={-16}>
          {this.props.children}
        </Scene>
      </Sprite>
    );
  }
}
