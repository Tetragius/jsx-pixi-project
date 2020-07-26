import { Sprite as PIXISprite, Texture as PIXITexture, Filter } from "pixi.js";
import { Component, PropsWithEvents } from "@tetragius/jsx-pixi";

interface SpriteProps extends PropsWithEvents {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  anchor?: number;
  texture?: string;
  filters?: Filter[];
  rotation?: number;
  angle?: number;
}

export class Sprite extends Component<SpriteProps> {
  sprite: PIXISprite;
  texture: PIXITexture;
  constructor(props: SpriteProps) {
    super(props);
    this.props.texture && (this.texture = PIXITexture.from(this.props.texture));
    this.sprite = new PIXISprite(this.texture);
    this.container.addChild(this.sprite);
    this.sprite.anchor.set(this.props.anchor ?? 0.5);
    this.sprite.x = this.props.x ?? 0;
    this.sprite.y = this.props.y ?? 0;
    this.sprite.rotation = this.props.rotation ?? 0;
    this.sprite.angle = this.props.angle ?? 0;
    this.container.filters = this.props.filters || [];
  }

  componentWillUpdate(props: SpriteProps) {
    this.container.filters = [
      ...this.container.filters,
      ...(props.filters || []),
    ];
    props.texture && (this.texture = PIXITexture.from(props.texture));
    this.sprite.texture = this.texture;
    this.sprite.x = props.x ?? 0;
    this.sprite.y = props.y ?? 0;
    this.sprite.rotation = props.rotation ?? 0;
    this.sprite.angle = props.angle ?? 0;
  }

  render() {
    return this.props.children;
  }
}
