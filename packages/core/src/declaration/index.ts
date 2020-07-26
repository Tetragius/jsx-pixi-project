import { INode, Component } from "..";
import { ComponentBase } from "../componentBase";

declare global {
  namespace JSX {
    // tslint:disable-next-line:no-empty-interface
    interface Element extends INode {}
    interface ElementClass extends Component<any> {
        render(): INode;
      }
  }
}
