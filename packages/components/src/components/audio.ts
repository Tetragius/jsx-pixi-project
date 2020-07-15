import { Component } from "@tetragius/jsx-pixi";

interface AudioProps {
  src: string;
}

export class SFX extends Component<AudioProps> {
  audioElement: HTMLAudioElement;
  source: HTMLSourceElement;

  constructor(props: AudioProps) {
    super(props);
  }

  componentWillMount() {
    this.audioElement = document.createElement("audio");
    this.audioElement.autoplay = true;

    this.source = document.createElement("source");
    this.source.src = this.props.src;

    this.audioElement.appendChild(this.source);
    document.body.appendChild(this.audioElement);

    this.audioElement.onended = () => this.audioElement.remove();
  }

  render(): any {
    return null;
  }
}
