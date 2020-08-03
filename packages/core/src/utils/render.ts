import { Application } from "pixi.js";
import { Component } from "..";

const deafultConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
};
export function render(root: any, container: any, config?: any): Application {
  const app = new Application({ ...deafultConfig, ...(config || {}) });
  container.appendChild(app.view);
  const mainScene: Component = new root.type(root.props);
  mainScene.app = app;
  app.stage.addChild(mainScene.container);
  return app;
}
