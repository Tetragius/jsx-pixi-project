# jsx-pixi-project

## What is this?

I am developing this for myself but it may be interesting for others...

I like to develop games. For my home project, I use [RPG Maker](https://www.rpgmakerweb.com/), based on the popular library [PIXI.JS](https://www.pixijs.com/). But writing plugins for RPG is pure pain.
I also like React (and I would like him more if no hooks were added to him)

So... After reading the excellent article ["Build your own React" by Rodrigo Pombo](https://pomb.us/build-your-own-react/) I decided to write my analogue react for pixi.js

What's the difference from [React PIXI](https://reactpixi.org/)? It's not react just JSX + PIXI.

## Motivation

Easily create 2D games (or application) like Visual Novels or jrpg using a component approach.

[Watch the video](https://youtu.be/87vSiy1S91Q)

(at the beginning of the movement, tacnk can disappear as frames are loaded, I have not yet done a texture loader)

[DEMO](https://tetragius.github.io/jsx-pixi-project/packages/example/dist/#/a)

## Plans

- add documentation
- add tests
- refactoring

## New at version 0.0.5

#### jsx-pixi-components

- better audio component

#### jsx-pixi

- add support defaultProps

## New at version 0.0.4

#### jsx-pixi-components

- add audio component (experemental)

#### jsx-pixi

- add support [text style](#textstyle) (PIXI.TextStyle)

## New at version 0.0.3

#### jsx-pixi-components

- add [Router](#router) component
- add Route component

#### jsx-pixi

- add `forceUpdate` method

## How it work?

The project consists of 3 parts:

- core (Main library. Required for babel and jsx parser)
- components (Main components, optionally)
- example (Just a example)

## Example

#### Install

> npm install --save-dev @tetragius/jsx-pixi

and

> npm install --save-dev @tetragius/jsx-pixi-components

#### Create or change .babelrc

```json
{
  "plugins": [
    [
      "@babel/transform-react-jsx",
      {
        "runtime": "classic",
        "importSource": "@tetragius/jsx-pixi",
        "pragma": "require('@tetragius/jsx-pixi').createElement",
        "pragmaFrag": "require('@tetragius/jsx-pixi').createFragment"
      }
    ]
  ]
}
```

#### Now you can create the appliction

For more details look at [repository](https://github.com/Tetragius/jsx-pixi-project/tree/master/packages/example/src)

(at the beginning of the movement, tacnk can disappear as frames are loaded, I have not yet done a texture loader)

[DEMO](https://tetragius.github.io/jsx-pixi-project/packages/example/dist/#/a)

#### Basics

Method render is an analogue of method ReactDOM.render, and return link on PIXI.Appllication

```jsx
import { render } from "@tetragius/jsx-pixi";
import { Game } from "./components/game";

render(<Game root width={910} height={480} />, document.body, {
  width: 910,
  height: 480,
  backgroundColor: 0x000000,
});
```

For create fadeIn/fadeOut screen or any comonents you can do like this

```jsx
import { Scene } from "@tetragius/jsx-pixi-components";

export class Screen extends Scene {
  k = 1;
  constructor(props: any) {
    super(props);
  }

  animation(tick: number) {
    if (this.container.alpha >= 0 && this.container.alpha <= 1) {
      this.container.alpha += 0.01 * tick * this.k;
    } else {
      this.ticker.stop();
    }
  }

  componentDidMount() {
    this.k = 1;
    this.container.alpha = 0;
  }

  componentWillUnmount() {
    this.k = -1;
    this.container.alpha = 1;
    this.ticker.start();
    return 2000;
  }

  render(): void {
    return <>{this.props.children}</>;
  }
}
```

Example for button

```jsx
import { Scene, Sprite, Filter } from "@tetragius/jsx-pixi-components";

export class Button extends Scene {
  state = { over: false };

  constructor(props: any) {
    super(props);
    this.container.buttonMode = true;
  }

  mouseOverHander = () => this.setState({ over: true });
  mouseOutHandler = () => this.setState({ over: false });

  render(): void {
    return (
      <Sprite
        texture="button.png"
        onMouseOver={this.mouseOverHander}
        onMouseOut={this.mouseOutHandler}
      >
        {!this.state.over && (
          <Filter builtIn="BlurFilter" builtInArgs={[0.5]} />
        )}
        <Scene x={-30} y={-16}>
          {this.props.children}
        </Scene>
      </Sprite>
    );
  }
}
```

I made analogues of life cycle methods and `setState` from `react`.
The two most significant differences are the animation method and the return value for the `componentWillUnmount` method, which indicates the delay until the component is deleted.

Also supports `ref` like

```jsx
<Component ref={...} />
```

where ref is a `PIXI.Container`

## Component

[Component](https://github.com/Tetragius/jsx-pixi-project/blob/master/packages/core/src/component/component.ts) is an analogues of `React.Component`

## Router

Works with [history](https://github.com/ReactTraining/history#readme) library.
Support only `hashHistory`

```jsx
import { Router, Route } from "@tetragius/jsx-pixi-components";
import { createHashHistory } from "history";

const history = createHashHistory();

///

<Router history={history}>
  <Route path="/a"></Route>
  <Route path="/b"></Route>
</Router>;

///

history.replace("/b");
```

## TextStyle

Example

```jsx
<Scene
  text={{
    fill: ["#ffffff", "#00ff99"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
  }}
>
  Text
</Scene>
```
