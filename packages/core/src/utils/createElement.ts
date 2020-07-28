export type Element = INode | string | boolean | undefined;

export interface INode {
  type?: any;
  props?: any;
  children?: INode[];
  instanse?: any;
  deleteTimer?: any;
  key?: string;
}

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
