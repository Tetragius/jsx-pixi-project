import { Scene, Sprite, Router, Route } from "@tetragius/jsx-pixi-components";
import { createHashHistory } from "history";
import { Screen } from "./screen";
import { Tank } from "./tank";
import { Button } from "./button";
import { Bullet } from "./bullet";

const history = createHashHistory();

interface State {
  tankX: number;
  tankY: number;
  charges: number;
  hits: number;
  bullets: Bullet[];
}

export class Game extends Scene<any, State> {
  constructor(props: any) {
    super(props);
  }

  state = {
    tankX: 455,
    tankY: 240,
    charges: 10,
    bullets: [] as any[],
    hits: 0,
  };

  enemyTankRef: any = null;

  moveTank = (data: any) => {
    this.setState({
      tankX: this.state.tankX + data.x,
      tankY: this.state.tankY + data.y,
    });
  };

  shutTank = (data: any) => {
    if (this.state.charges > 0) {
      const bullets = [
        ...this.state.bullets,
        <Bullet
          key={Math.random().toString(16)}
          width={20}
          height={4}
          x={this.state.tankX}
          y={this.state.tankY}
          texture="bullet.png"
          angle={data.angle}
        />,
      ];
      this.setState({ charges: this.state.charges - 1, bullets });
    }
  };

  animation(tick: number) {
    this.state.bullets.forEach((bullet) => {
      switch (bullet.props.angle) {
        case 0:
          bullet.props.x += 1 * tick;
          break;
        case 90:
          bullet.props.y += 1 * tick;
          break;
        case 180:
          bullet.props.x -= 1 * tick;
          break;
        case 270:
          bullet.props.y -= 1 * tick;
          break;
      }
    });
    if (this.state.bullets.length) {
      this.setState({
        bullets: this.state.bullets.filter((bullet) => {
          const enemy = this.enemyTankRef.getBounds();
          if (
            bullet.props.x > enemy.left &&
            bullet.props.x < enemy.right &&
            bullet.props.y > enemy.top &&
            bullet.props.y < enemy.bottom
          ) {
            this.setState({ hits: this.state.hits + 1 });
            return false;
          }

          if (
            bullet.props.x < 910 &&
            bullet.props.x > 0 &&
            bullet.props.y < 480 &&
            bullet.props.y > 0
          ) {
            return true;
          }
          return false;
        }),
      });
    }
  }

  render() {
    return (
      <Router history={history}>
        <Route path="/a">
          <Screen>
            <Button x={455} y={240} onClick={() => history.replace("/b")}>
              Start
            </Button>
          </Screen>
        </Route>
        <Route path="/b">
          <Screen>
            <Sprite x={0} y={0} anchor={0} texture="map.jpg" />
            <Tank
              x={this.state.tankX}
              y={this.state.tankY}
              onMove={this.moveTank}
              onShut={this.shutTank}
            />
            <Tank
              ref={(ref: any) => (this.enemyTankRef = ref)}
              x={500}
              y={240}
            />
            <Button x={800} y={45} onClick={() => history.replace("/a")}>
              Pause
            </Button>
            <Screen x={20} y={20}>
              {`charges : ${this.state.charges} hit rate : ${this.state.hits}`}
            </Screen>
            {this.state.bullets}
          </Screen>
        </Route>
      </Router>
    );
  }
}
