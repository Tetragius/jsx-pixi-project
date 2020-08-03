import { Sprite as PIXISprite, Texture as PIXITexture } from "pixi.js";
import { PropsWithEvents, Component } from "@tetragius/jsx-pixi";
import { setExternalProps } from "../utils/setExternalProps";

interface MaskProps
  extends PropsWithEvents,
    Partial<Omit<PIXISprite, "children" | "anchor">> {
  src?: string;
}

export class Mask extends Component<MaskProps> {
  sprite: PIXISprite;
  texture: PIXITexture;
  constructor(props: MaskProps) {
    super(props);
  }

  componentWillMount() {
    this.props.src && (this.texture = PIXITexture.from(this.props.src));
    this.sprite = new PIXISprite(this.texture);
    this.sprite.width = this.parent.container.width;
    this.sprite.height = this.parent.container.height;
    setExternalProps(this.sprite, this.props);
    this.container.addChild(this.sprite);
    this.parent.container.mask = this.sprite;
  }

  componentWillUpdate(props: any) {
    props.src && (this.texture = PIXITexture.from(props.src));
    this.sprite.texture = this.texture;
    this.sprite.width = this.parent.container.width;
    this.sprite.height = this.parent.container.height;
    setExternalProps(this.sprite, this.props);
    this.parent.container.mask = this.sprite;
  }
}
