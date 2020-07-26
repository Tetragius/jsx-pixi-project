import { Texture as PIXITexture } from "pixi.js";
import { ComponentBase } from "@tetragius/jsx-pixi";

interface TextureProps {
  src?: string;
}

export class Texture extends ComponentBase {
  props: TextureProps;
  texture: PIXITexture;
  constructor(props: TextureProps) {
    super(props);
    this.texture = PIXITexture.from(this.props.src);
  }

  componentWillMount() {
    (this.parent as any).texture = this.texture;
    (this.parent as any).sprite.texture = this.texture;
  }
}
