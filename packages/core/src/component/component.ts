import { Container, Text, Ticker, Application } from "pixi.js";
import { eventsFromProps, removeEvents, PropsWithEvents } from "../helpers";

export type PropsWithChildren<P = any> = P & {
  children?: any;
  ref?: (ref?: Container) => void | { current: Container };
};

export interface IComponent<P = any, S = any> {
  props: PropsWithEvents<PropsWithChildren<P>>;
  state: S;
  container: Container;
  setState(state: Partial<S>): void;
}

export class Component<P = any, S = any> implements IComponent<P, S> {
  static type = Symbol("component");

  isMounted: boolean = false;

  parent?: Container;
  app: Application;

  container: Container = new Container();
  ticker: Ticker;

  #prevChildren: any[] = [];

  props: PropsWithEvents<PropsWithChildren<P>>;
  state: S;

  constructor(props: PropsWithEvents<PropsWithChildren<P>>) {
    this.props = props;

    eventsFromProps(this.container, this.props); // добавлям обработчики событий

    this.container.on("added", () => this.added());
    this.container.on("removed", () => this.removed());
  }

  added() {
    this.isMounted = true;
    this.update();
    if (this.animation) {
      this.ticker = new Ticker();
      this.ticker.autoStart = true;
      this.ticker.add(this.animation, this);
    }
    this.componentDidMount && this.componentDidMount(this.props, this.state);

    if (this.props.ref) {
      if (typeof this.props.ref === "function") {
        this.props.ref(this.container);
      } else if ("current" in this.props.ref) {
        (this.props.ref as any).current = this.container;
      } else {
        throw "ref must be a function or object like {current: Container}";
      }
    }
  }

  removed() {
    this.isMounted = false;
    this.componentDidUnmount &&
      this.componentDidUnmount(this.props, this.state);
    if (this.animation && this.ticker) {
      this.animation && this.ticker.remove(this.animation, this);
      this.ticker.destroy();
    }
    removeEvents(this.props);
    this.container.removeChildren();
    delete this.container;
  }

  update(props = this.props) {
    this.props = props; // Обновляем пропсы
    const rendered = this.render(); // Рендерим ноду

    let children = // Получаем список дочерних нод
      rendered?.type?.type === Component.type
        ? [rendered]
        : rendered?.children || rendered?.props?.children || props?.children;

    children = children.flat(2);

    const temp: any[] = []; // Определяем вреенный массив для сохранения отрендеренных нод

    // Перебераем все дочерние ноды
    for (const idx in children) {
      if (!this.isMounted) {
        return this;
      }

      let child = children[idx];

      // Если пустая
      if (!child) {
        child = { instanse: null };
      }

      // Если нода текстовая то выводим текст как картинку
      if (typeof child === "string") {
        const text = child;
        child = {};
        child.instanse = { container: new Text(text) };
        this.container.addChild(child.instanse.container);
      }

      child.key = child?.props?.key ?? idx;
      const old = this.#prevChildren.find((o) => o.key === child.key); // Смотрим есть ли нода в этой позиции с предыдущего рендера

      // Если нода существовала на прошлом рендере, но отсутствует в новом
      // Важно - проверяем наличие ноды в container методом getChildIndex
      if (old?.instanse?.container && !child?.type) {
        old.instanse.isMounted = false;
        if (old?.instanse?.componentWillUnmount) {
          const delay = old.instanse.componentWillUnmount(old.props); // Вызываем метод до удаления
          old.deleteTimer =
            !old.deleteTimer &&
            setTimeout(() => {
              const index = this.container.getChildIndex(
                old.instanse.container
              ); // получаем ключ старой ноды
              this.container.removeChildAt(index);
              old.deleteTimer = null;
              delete old.instanse;
            }, delay || 0);
        } else {
          const index = this.container.getChildIndex(old.instanse.container); // получаем ключ старой ноды
          this.container.removeChildAt(index); // удаляем старую ноду
          delete old.instanse;
        }
      }

      // Если нет старой ноды от предыдущего рендера
      if (!old?.instanse && child?.type?.type === Component.type) {
        child.instanse = new child.type(child.props); // Создаем ноду по ее типу
        child.instanse.parent = this.container; // Передаем ссылку на родителя
        child.instanse.app = this.app; // Передаем ссылку на приложение
        child.instanse.componentWillMount &&
          child.instanse.componentWillMount(child.props); // Вызываем метод до создания
        this.container.addChild(child.instanse.container); // Добавлем ноду в контейнер
      }

      // Если старая нода есть (и она унаследована от компонента)
      if (
        old?.instanse?.container &&
        child?.type?.type === Component.type &&
        old.key === child.key
      ) {
        old?.instanse?.componentWillUpdate &&
          old.instanse.componentWillUpdate(child.props); // Вызываем метод до оновления
        child.instanse = old.instanse.update(child.props); // Обновляем ноду с новыми пропсами
      }

      temp.push(child); // записываем ноду во временный мосив
    }

    // TODO упростить
    for (const old of this.#prevChildren) {
      if (!temp.find((tmp) => tmp.key === old.key)) {
        old.instanse.isMounted = false;
        if (old?.instanse?.componentWillUnmount) {
          const delay = old.instanse.componentWillUnmount(old.props); // Вызываем метод до удаления
          old.deleteTimer =
            !old.deleteTimer &&
            setTimeout(() => {
              const index = this.container.getChildIndex(
                old.instanse.container
              ); // получаем ключ старой ноды
              this.container.removeChildAt(index);
              old.deleteTimer = null;
              delete old.instanse;
            }, delay || 0);
        } else {
          const index = this.container.getChildIndex(old.instanse.container); // получаем ключ старой ноды
          this.container.removeChildAt(index); // удаляем старую ноду
          delete old.instanse;
        }
      }
    }

    this.#prevChildren = temp; // обновляем предыдущий рендер для следующего шага

    this.componentDidUpdate && this.componentDidUpdate(props, this.state); // Вызываем метод обновления
    return this; // Возвращаем ссылку на самого себя
  }

  // Обновляем стейт
  setState(newState: Partial<S>) {
    if (this.state !== newState) {
      this.state = { ...this.state, ...newState };
      this.update();
    }
  }

  componentWillMount?(props: P): void;
  componentDidMount?(props: P, state: S): void;
  componentWillUpdate?(props: P, state: S): void;
  componentDidUpdate?(props: P, state: S): void;
  componentWillUnmount?(props: P): void;
  componentDidUnmount?(props: P, state: S): void;
  animation?(tick: number): void;
  render?(): any;
}
