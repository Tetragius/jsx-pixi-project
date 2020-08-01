import { INode } from ".";
import { ComponentBase } from "../componentBase";

type Key = string | number;
type Ref = any;
interface Attributes {
  key?: Key;
}
interface ClassAttributes extends Attributes {
  ref?: Ref;
}

declare global {
  namespace JSX {
    interface Element extends INode {}

    interface ElementClass extends ComponentBase<any> {
      ref?: any;
      key?: string;
    }

    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicClassAttributes extends ClassAttributes {}
  }
}
