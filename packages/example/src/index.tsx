import { render } from "@tetragius/jsx-pixi";
import { Game } from "./components/game";

render(<Game root width={910} height={480} />, document.body, {
  width: 910,
  height: 480,
  backgroundColor: 0x000000,
});
