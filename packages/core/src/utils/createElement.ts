export function createElement(type: any, props: any, ...children: any) {
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
