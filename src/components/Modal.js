import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
  }

  // require!: after the portal mounting with container
  // we need to mount container with the modal-root in the real Dom
  componentDidMount() {
    modalRoot.appendChild(this.container);
  }

  // and un mount it out from the real dom, if the react dom wants to unmount
  componentWillUnmount() {
    modalRoot.removeChild(this.container);
  }

  // create want is in the container (all the children that we assign will render to the modal root)
  render() {
    return createPortal(this.props.children, this.container);
  }
}

export default Modal;
