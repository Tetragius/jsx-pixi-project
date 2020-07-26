import { Filter as PIXIFilter, filters } from "pixi.js";
import { ComponentBase } from "@tetragius/jsx-pixi";

interface TextureProps {
  builtIn?: "BlurFilter" | "NoiseFilter";
  builtInArgs?: any[];
  vShader?: string;
  fShader?: string;
  uniform?: any;
}

export class Filter extends ComponentBase {
  props: TextureProps;
  filter: PIXIFilter;
  constructor(props: TextureProps) {
    super(props);
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

  componentWillMount() {
    (this.parent as any).container.filters.push(this.filter);
  }

  componentWillUpdate(props: TextureProps) {
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
    const index = (this.parent as any).container.filters.indexOf(this.filter);
    (this.parent as any).container.filters.splice(index, 1);
    (this.parent as any).container.filters.push(this.filter);
  }

  componentWillUnmount() {
    const index = (this.parent as any).container.filters.indexOf(this.filter);
    (this.parent as any).container.filters.splice(index, 1);
  }
}
