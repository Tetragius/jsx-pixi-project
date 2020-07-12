export function createElement(type: any, props: any, ...children: any) {
  props = { ...(props || {}), children };
  return {
    type,
    props,
    children,
  };
}
