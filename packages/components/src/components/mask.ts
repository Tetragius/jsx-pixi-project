import { Sprite as PIXISprite, Texture as PIXITexture, Filter } from "pixi.js";
import { ComponentBase } from "@tetragius/jsx-pixi";

interface MaskProps {
  texture?: string;
}

export class Mask extends ComponentBase<MaskProps> {
  sprite: PIXISprite;
  texture: PIXITexture;
  constructor(props: MaskProps) {
    super(props);
  }

  componentWillMount() {
    this.props.texture && (this.texture = PIXITexture.from(this.props.texture));
    this.sprite = new PIXISprite(this.texture);
    (this.parent as any).container.addChild(this.sprite);
    (this.parent as any).container.mask = this.sprite;
  }

  componentWillUpdate(props: any) {
    props.texture && (this.texture = PIXITexture.from(props.texture));
    this.sprite.texture = this.texture;
    (this.parent as any).container.mask = this.sprite;
  }
}
