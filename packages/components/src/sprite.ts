import { Sprite as PIXISprite, Texture as PIXITexture } from "pixi.js";
import { Component, PropsWithChildren, PropsWithEvents } from "@tetragius/jsx-pixi";
import { Texture, Filter } from ".";

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

const textureFromChildren = (children?: any) => {
  if (!children) {
    return null;
  }
  const texture = children.find((c: any) => c.type === Texture);
  return new texture.type(texture.props);
};

const filterFromChildren = (children?: any) => {
  if (!children) {
    return null;
  }
  const filters = children.filter((c: any) => c.type === Filter);
  return filters.map((f: any) => new f.type(f.props).filter);
};

export class Sprite extends Component<SpriteProps> {
  sprite: PIXISprite;
  texture: PIXITexture;
  constructor(props: SpriteProps) {
    super(props);
    this.texture = this.props.texture
      ? PIXITexture.from(this.props.texture)
      : textureFromChildren(this.props.children)?.texture;
    this.sprite = new PIXISprite(this.texture);
    this.container.addChild(this.sprite);
    this.sprite.anchor.set(this.props.anchor ?? 0.5);
    this.sprite.x = this.props.x ?? 0;
    this.sprite.y = this.props.y ?? 0;
    this.sprite.rotation = this.props.rotation ?? 0;
    this.sprite.angle = this.props.angle ?? 0;
    this.container.filters =
      this.props.filters || filterFromChildren(this.props.children);
  }

  componentWillUpdate(props: PropsWithChildren<SpriteProps>) {
    this.container.filters =
      props.filters || filterFromChildren(props.children);
    this.texture = props.texture
      ? PIXITexture.from(props.texture)
      : textureFromChildren(props.children)?.texture;
    this.sprite.texture = this.texture;
    this.sprite.x = props.x ?? 0;
    this.sprite.y = props.y ?? 0;
    this.sprite.rotation = props.rotation ?? 0;
    this.sprite.angle = props.angle ?? 0;
  }

  render(): any {
    return null;
  }
}
