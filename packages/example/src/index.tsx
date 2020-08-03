import { render } from "@tetragius/jsx-pixi";
import { Game } from "./components/game";

render(<Game />, document.body, {
  backgroundColor: 0x000000,
  width: 770,
  height: 340,
});
