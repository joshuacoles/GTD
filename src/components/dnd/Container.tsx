import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import container, { ContainerOptions, dropHandlers, SmoothDnD } from 'smooth-dnd';

Object.assign(container, {
  dropHandler: dropHandlers.reactDropHandler().handler,
  wrapChild: p => p,
});

class Container extends Component<Props, {}> {
  static defaultProps = {
    behaviour: 'move',
    orientation: 'vertical',
    className: 'reactTrelloBoard'
  };

  containerDiv: HTMLElement | null;
  prevContainer: Element | null | Text;
  container: SmoothDnD | null;

  constructor(props) {
    super(props);
    this.getContainerOptions = this.getContainerOptions.bind(this);
    this.setRef = this.setRef.bind(this);
    this.prevContainer = null;

    this.containerDiv = null;
    this.container = null;
  }

  getOwnElement(): HTMLElement {
    const node = ReactDOM.findDOMNode(this);
    if (!(node instanceof HTMLElement)) throw 'Must have a body of an HTMLElement';

    return node;
  }

  componentDidMount() {
    this.containerDiv = this.containerDiv || this.getOwnElement();
    this.prevContainer = this.containerDiv;
    this.container = container(this.containerDiv, this.getContainerOptions());
  }

  componentWillUnmount() {
    if (this.container === null) throw 'Inconsistent state';

    this.container.dispose();
    this.container = null;
  }

  componentDidUpdate() {
    if (this.container === null) throw 'Inconsistent state';

    this.containerDiv = this.containerDiv || this.getOwnElement();
    if (this.containerDiv) {
      if (this.prevContainer && this.prevContainer !== this.containerDiv) {
        this.container.dispose();
        this.container = container(this.containerDiv, this.getContainerOptions());
        this.prevContainer = this.containerDiv;
      }
    }
  }

  render() {
    if (this.props.render) {
      return this.props.render(this.setRef);
    } else {
      return (
        <div style={this.props.style} ref={this.setRef}>
          {this.props.children}
        </div>
      );
    }
  }

  setRef(element) {
    this.containerDiv = element;
  }

  // TODO: This previously had manual binding of all items in props, surly anything you pass through props will be bound
  //       already (binding meaning functionProps.XXX = (...p) => this.props.XXX(...p)
  getContainerOptions(): ContainerOptions {
    // const bindProps = [
    //   'onDragStart',
    //   'onDragEnd',
    //   'onDrop',
    //   'getChildPayload',
    //   'shouldAnimateDrop',
    //   'shouldAcceptDrop',
    //   'onDragEnter',
    //   'onDragLeave',
    //   'render',
    //   'onDropReady',
    //   'getGhostParent',
    // ];

    return this.props;
  }
}

interface Props extends ContainerOptions {
  style?: object,
  className?: string,
  render?: (props: object) => ReactNode,
}

export default Container;
