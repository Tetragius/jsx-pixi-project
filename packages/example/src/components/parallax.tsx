import { TilingSprite, Filter } from "@tetragius/jsx-pixi-components";
import { Component } from "@tetragius/jsx-pixi";

interface Props {
  layers?: string[];
  width?: number;
}

interface State {
  parallaxX: number[];
}

export class Parallax extends Component<Props, State> {
  static defaultProps: Props = { layers: [] };
  constructor(props: any) {
    super(props);
  }

  state: State = { parallaxX: this.props.layers.map(() => 0) };

  animation() {
    const newParallaxX = this.state.parallaxX.map((x, index) =>
      x > -this.props.width ? x - index * 0.2 : 0
    );
    this.setState({ parallaxX: newParallaxX });
  }

  componentWillUpdate(props: Props) {
    if (this.props.layers !== props.layers) {
      this.setState({
        parallaxX: props.layers.map((v, idx) => this.state.parallaxX[idx] || 0),
      });
    }
  }

  render() {
    return this.props.layers.map((layer, index) => (
      <TilingSprite
        width={this.props.width * 2}
        anchor={{ x: 0, y: 1 }}
        x={this.state.parallaxX[index]}
        src={layer}
      >
        <Filter
          builtIn="BlurFilter"
          builtInArgs={[2 * (this.props.layers.length - index - 1)]}
        />
      </TilingSprite>
    ));
  }
}
