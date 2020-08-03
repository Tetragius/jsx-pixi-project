import { Sprite as PIXISprite, Texture as PIXITexture } from "pixi.js";
import { Component, PropsWithEvents } from "@tetragius/jsx-pixi";
import { setExternalProps } from "../utils/setExternalProps";

export interface SpriteProps
  extends PropsWithEvents,
    Partial<Omit<PIXISprite, "children" | "anchor">> {
  src?: string;
  anchor?: number | { x: number; y: number };
}

export class Sprite extends Component<SpriteProps> {
  sprite: PIXISprite;
  texture: PIXITexture;
  constructor(props: SpriteProps) {
    super(props);
    this.props.src && (this.texture = PIXITexture.from(this.props.src));
    this.sprite = new PIXISprite(this.texture);
    this.sprite.anchor.set(0.5);
    this.texture?.baseTexture.on("loaded", () => {
      this.sprite.height = this.texture.height;
      this.sprite.width = this.texture.width;
    });
    setExternalProps(this.sprite, this.props);
    this.container.addChild(this.sprite);
  }

  componentWillUpdate(props: SpriteProps) {
    this.container.filters = [
      ...(this.container.filters || []),
      ...(props.filters || []),
    ];
    props.src && (this.texture = PIXITexture.from(props.src));
    this.sprite.texture = this.texture;
    setExternalProps(this.sprite, props);
  }

  render() {
    return this.props.children;
  }
}
