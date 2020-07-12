import { Filter as PIXIFilter, filters } from "pixi.js";

interface TextureProps {
  builtIn?: "BlurFilter" | "NoiseFilter";
  builtInArgs?: any[];
  vShader?: string;
  fShader?: string;
  uniform?: any;
}

export class Filter {
  props: TextureProps;
  filter: PIXIFilter;
  constructor(props: TextureProps) {
    this.props = props;
    const {
      builtIn,
      builtInArgs = [],
      vShader = null,
      fShader = null,
      uniform = {},
    } = props;
    if (builtIn) {
      this.filter = new filters[builtIn](...builtInArgs);
    } else {
      this.filter = new PIXIFilter(vShader, fShader, uniform);
    }
  }
}
