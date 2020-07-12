import { Texture as PIXITexture } from "pixi.js";

interface TextureProps {
  src?: string;
}

export class Texture {
  props: TextureProps;
  texture: PIXITexture;
  constructor(props: TextureProps) {
    this.props = props;
    this.texture = PIXITexture.from(this.props.src);
  }
}
