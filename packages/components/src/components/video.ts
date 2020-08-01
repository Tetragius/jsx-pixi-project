import { Component } from "@tetragius/jsx-pixi";
import * as PIXI from "pixi.js";

interface VideoProps {
  key: string;
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onEnd?(): void;
  height?: number;
  width?: number;
  onPlay: (value: boolean) => void;
  pauseTime?: number;
  playTime?: number;
  currentTime?: number;
  x: number;
  y: number;
}

interface VideoState {
  isPlayStop: boolean;
  isPlay: boolean;
  isPause: boolean;
}

export class VFX extends Component<VideoProps, VideoState> {
  videoElement: HTMLVideoElement;
  source: HTMLSourceElement;
  texture: PIXI.Texture;
  sprite: PIXI.Sprite;

  state = {
    isPlayStop: true,
    isPlay: true,
    isPause: false,
  };

  static defaultProps = {
    autoplay: true,
    loop: false,
    pauseTime: 0,
    playTime: 0,
    currentTime: 0,
  };

  constructor(props: VideoProps) {
    super(props);
  }

  pause = (time: number) => {
    setTimeout(() => {
      this.videoElement.pause();
    }, time);
    this.setState({
      isPause: true,
      isPlay: false,
    });
  };

  play = (time: number) => {
    setTimeout(() => {
      this.videoElement.play();
    }, time);
    this.setState({
      isPlay: true,
      isPause: false,
    });
  };

  playCertainTime = (time: number, playTime: number) => {
    setTimeout(() => {
      this.videoElement.currentTime = time;
    }, playTime);
    this.setState({
      isPlay: true,
      isPause: false,
    });
  };

  componentWillUpdate(props: VideoProps) {
    this.videoElement.autoplay = this.props.autoplay;
    this.videoElement.loop = props.loop;
    this.videoElement.muted = props.muted;
    this.container.x = this.props.x;
    this.container.y = this.props.y;
    this.sprite.width = this.props.width ?? this.app.screen.width;
    this.sprite.height = this.props.height ?? this.app.screen.height;

    this.props.pauseTime !== null &&
      this.props.pauseTime !== undefined &&
      this.pause(this.props.pauseTime);
    this.props.playTime !== null &&
      this.props.playTime !== undefined &&
      this.play(this.props.playTime);
    this.props.currentTime !== null &&
      this.props.currentTime !== undefined &&
      this.playCertainTime(this.props.currentTime, this.props.playTime);

    if (this.props.src !== props.src) {
      this.source.src = props.src;
      this.videoElement.load();
      this.videoElement.play();
    }
  }

  componentWillMount() {
    this.videoElement = document.createElement("video");
    this.videoElement.autoplay = this.props.autoplay;
    this.videoElement.loop = this.props.loop;
    this.videoElement.muted = this.props.muted;
    this.container.x = this.props.x;
    this.container.y = this.props.y;
    this.source = document.createElement("source");
    this.source.src = this.props.src;

    this.videoElement.appendChild(this.source);

    this.texture = PIXI.Texture.from(this.videoElement);
    this.sprite = new PIXI.Sprite(this.texture);

    this.sprite.width = this.props.width ?? this.app.screen.width;
    this.sprite.height = this.props.height ?? this.app.screen.height;

    this.container.addChild(this.sprite);

    this.props.pauseTime !== null &&
      this.props.pauseTime !== undefined &&
      this.pause(this.props.pauseTime);
    this.props.playTime !== null &&
      this.props.playTime !== undefined &&
      this.play(this.props.playTime);
    this.props.currentTime !== null &&
      this.props.currentTime !== undefined &&
      this.playCertainTime(this.props.currentTime, this.props.playTime);

    this.videoElement.onended = () => {
      this.videoElement.remove();
      this.app.stage.removeChild(this.sprite);
      if (typeof this.props.onEnd === "function") {
        this.props.onEnd();
      }

      this.props.onPlay(this.state.isPlayStop);
    };
  }

  componentDidUnmount() {
    if (this.videoElement && this.props.loop) {
      this.videoElement.remove();
    }
  }

  render() {
    return this.props.children;
  }
}
