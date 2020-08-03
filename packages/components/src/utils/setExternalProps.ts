export const setExternalProps = (obj: any, props: any) => {
  const keys = Object.keys(props);
  for (const key of keys) {
    switch (key) {
      case "children":
        continue;
      case "anchor":
        if (obj?.achor?.set && typeof props.achor === "number") {
          obj.anchor.set(props.anchor);
        } else {
          obj[key] = props[key];
        }
        continue;
      default:
        obj[key] = props[key];
        continue;
    }
  }
};
