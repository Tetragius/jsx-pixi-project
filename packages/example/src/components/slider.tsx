import { Scene, Sprite } from "@tetragius/jsx-pixi-components";

interface Props {
  min?: number;
  max?: number;
  value: number;
  onChange(data: number): void;
}

export class Slider extends Scene<Props> {
  state = {
    value: this.props.value,
    x: this.props.value * 1.5 ,
  };

  data: any = {};
  dragging = false;
  ref = { current: null } as any;

  static defaultProps = { min: 0, max: 100, value: 50 };

  constructor(props: any) {
    super(props);
  }

  onDragStart = (event: any) => {
    this.data = event.data;
    this.dragging = true;
  };

  onDragEnd = () => {
    this.dragging = false;
    this.data = null;
  };

  onDragMove = () => {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.ref.current);
      if (newPosition.x >= 25 && newPosition.x <= 175) {
        this.setState({ x: newPosition.x - 25 });
        this.props.onChange((newPosition.x - 25) / 1.5);
      }
    }
  };

  render(): void {
    return (
      <Scene ref={this.ref}>
        <Sprite texture="line.png" anchor={0} />
        <Sprite
          anchor={0}
          x={this.state.x}
          texture="circle.png"
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragEnd}
          onMouseUpUoutside={this.onDragEnd}
          onMouseMove={this.onDragMove}
        />
      </Scene>
    );
  }
}
