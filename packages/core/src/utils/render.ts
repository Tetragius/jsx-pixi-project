import { Application } from "pixi.js";
import { Component } from "..";

export function render(root: any, container: any, config: any): Application {
  const app = new Application(config);
  container.appendChild(app.view);
  const mainScene: Component = new root.type(root.props);
  mainScene.app = app; // Ссылка на приложение
  app.stage.addChild(mainScene.container);
  return app;
}
