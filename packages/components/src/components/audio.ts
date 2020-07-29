import { Component } from "@tetragius/jsx-pixi";

interface AudioProps {
  key: string;
  src: string;
  autoplay?: boolean;
  repeat?: boolean;
  volume?: number;
  onEnd?(): void;
}

export class SFX extends Component<AudioProps> {
  audioElement: HTMLAudioElement;
  source: HTMLSourceElement;

  static defaultProps = { autoplay: true, volume: 1.0, repeat: false };

  constructor(props: AudioProps) {
    super(props);
  }

  play = () => {
    if (this.audioElement) {
      this.audioElement.play();
    }
  };

  componentWillUpdate(props: AudioProps) {
    this.audioElement.autoplay = this.props.autoplay;
    this.audioElement.loop = props.repeat;
    this.audioElement.volume = props.volume;

    if (this.props.src !== props.src) {
      this.source.src = props.src;
      this.audioElement.load();
      this.audioElement.play();
    }
  }

  componentWillMount() {
    this.audioElement = document.createElement("audio");
    this.audioElement.autoplay = this.props.autoplay;
    this.audioElement.loop = this.props.repeat;
    this.audioElement.volume = this.props.volume;

    this.source = document.createElement("source");
    this.source.src = this.props.src;

    this.audioElement.appendChild(this.source);
    document.body.appendChild(this.audioElement);

    this.audioElement.onended = () => {
      this.audioElement.remove();
      if (typeof this.props.onEnd === "function") {
        this.props.onEnd();
      }
    };
  }

  componentDidUnmount() {
    if (this.audioElement && this.props.repeat) {
      this.audioElement.remove();
    }
  }

  render(): any {
    return null;
  }
}
