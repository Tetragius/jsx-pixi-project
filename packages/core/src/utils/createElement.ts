import { INode } from "../declaration";

export function createElement(type: any, props: any, ...children: any): INode {
  props = props ?? {};
  props.children = children;
  if (type.defaultProps) {
    props = { ...type.defaultProps, ...props };
  }
  return {
    type,
    props,
    children,
  };
}
