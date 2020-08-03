import {
  TilingSprite as PIXITilingSprite,
  Texture as PIXITexture,
} from "pixi.js";
import { Component, PropsWithEvents } from "@tetragius/jsx-pixi";
import { setExternalProps } from "../utils/setExternalProps";

export interface TilingSpriteProps
  extends PropsWithEvents,
    Partial<Omit<PIXITilingSprite, "children" | "anchor">> {
  src?: string;
  anchor?: number | { x: number; y: number };
}

export class TilingSprite extends Component<TilingSpriteProps> {
  sprite: PIXITilingSprite;
  texture: PIXITexture;
  constructor(props: TilingSpriteProps) {
    super(props);
    this.props.src
      ? (this.texture = PIXITexture.from(this.props.src))
      : (this.texture = PIXITexture.EMPTY);
    this.sprite = new PIXITilingSprite(this.texture);
    setExternalProps(this.sprite, props);
    this.container.addChild(this.sprite);
  }

  componentWillUpdate(props: TilingSpriteProps) {
    this.container.filters = [
      ...(this.container.filters || []),
      ...(props.filters || []),
    ];
    props.src && (this.texture = PIXITexture.from(props.src));
    this.sprite.texture = this.texture;
    this.sprite.height = this.texture.height;
    this.sprite.width = this.texture.width;
    setExternalProps(this.sprite, props);
  }

  render() {
    return this.props.children;
  }
}
