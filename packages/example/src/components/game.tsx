import {
  Scene,
  Sprite,
  Router,
  Route,
  SFX,
  VFX,
} from "@tetragius/jsx-pixi-components";
import { createHashHistory } from "history";
import { Screen } from "./screen";
import { Tank } from "./tank";
import { Button } from "./button";
import { Bullet } from "./bullet";
import { Slider } from "./slider";

const history = createHashHistory();

interface State {
  tankX: number;
  tankY: number;
  videoX: number;
  videoY: number;
  charges: number;
  hits: number;
  bullets: Bullet[];
  track: string;
  video: string;
  volume: number;
  heightVideo: number;
  widthVideo: number;
  isStopVideo: boolean;
  mutedVideo: boolean;
}

export class Game extends Scene<any, State> {
  constructor(props: any) {
    super(props);
  }

  state = {
    tankX: 455,
    tankY: 240,
    videoX: 0,
    videoY: 0,
    charges: 10,
    bullets: [] as any[],
    hits: 0,
    track: "bkg.mp3",
    video: "video2.mp4",
    volume: 0,
    heightVideo: 200,
    widthVideo: 200,
    isStopVideo: false,
    mutedVideo: true,
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
          bullet.props.x += 3 * tick;
          break;
        case 90:
          bullet.props.y += 3 * tick;
          break;
        case 180:
          bullet.props.x -= 3 * tick;
          break;
        case 270:
          bullet.props.y -= 3 * tick;
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

  changeVolume = (data: any) => this.setState({ volume: data });

  updatePlayingVideo = (isStopPlay: boolean) => {
      this.setState({
          isStopVideo: isStopPlay,
      });
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
          {!this.state.isStopVideo && (
              <VFX
                  key="vfx"
                  src={this.state.video}
                  onPlay={this.updatePlayingVideo}
                  playTime={10000}
                  pauseTime={5000}
                  currentTime={0}
                  loop={false}
                  autoplay={true}
                  width={300}
                  height={300}
                  x={this.state.videoX}
                  y={this.state.videoY}
                  muted={this.state.mutedVideo}
              />
          )}
          {this.state.isStopVideo && (
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
                <Screen
                    x={20}
                    y={20}
                    textStyle={{
                      fill: ["#ffffff", "#00ff99"],
                      stroke: "#4a1850",
                      strokeThickness: 5,
                      dropShadow: true,
                      dropShadowColor: "#000000",
                    }}
                >
                  {`charges : ${this.state.charges} hit rate : ${this.state.hits}`}
                </Screen>
                <Slider
                    x={20}
                    y={80}
                    value={this.state.volume}
                    onChange={this.changeVolume}
                />
                <Button
                    x={800}
                    y={85}
                    onClick={() => this.setState({ track: "bkg.mp3" })}
                >
                  Track 1
                </Button>
                <Button
                    x={800}
                    y={125}
                    onClick={() => this.setState({ track: "bkg2.mp3" })}
                >
                  Track 2
                </Button>
                <Button
                    x={800}
                    y={165}
                    onClick={() => this.setState({ track: "bkg3.mp3" })}
                >
                  Track 3
                </Button>
                {this.state.bullets}
                <SFX
                    key="sfx"
                    src={this.state.track}
                    volume={this.state.volume / 100}
                    repeat
                />
              </Screen>
          )}
        </Route>
      </Router>
    );
  }
}
