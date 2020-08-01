import {
  TilingSprite as PIXITilingSprite,
  Texture as PIXITexture,
  Filter,
} from "pixi.js";
import { Component, PropsWithEvents } from "@tetragius/jsx-pixi";

export interface TilingSpriteProps extends PropsWithEvents {
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

export class TilingSprite extends Component<TilingSpriteProps> {
  sprite: PIXITilingSprite;
  texture: PIXITexture;
  constructor(props: TilingSpriteProps) {
    super(props);
    this.props.texture && (this.texture = PIXITexture.from(this.props.texture));
    this.sprite = new PIXITilingSprite(this.texture || PIXITexture.EMPTY);
    this.container.addChild(this.sprite);
    this.sprite.anchor.set(this.props.anchor ?? 0.5);
    this.sprite.x = this.props.x ?? 0;
    this.sprite.y = this.props.y ?? 0;
    this.sprite.rotation = this.props.rotation ?? 0;
    this.sprite.angle = this.props.angle ?? 0;
    this.sprite.width = this.props.width ?? 0;
    this.sprite.height = this.props.height ?? 0;
    this.container.filters = this.props.filters || [];
  }

  componentWillUpdate(props: TilingSpriteProps) {
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
    this.sprite.width = props.width ?? 0;
    this.sprite.height = props.height ?? 0;
  }

  render() {
    return this.props.children;
  }
}
