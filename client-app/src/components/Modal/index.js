import { useRef } from "react";
import cn from "classnames";
import { createPortal } from "react-dom";

import { useClickOutside, useDisableScroll } from "../../common/hooks";
import "./style.scss";

const modalRoot = document.getElementById("modal-root");

const ModalHOC = (Component) => {
  const Modal = ({ className, style, onClose, ...rest }) => {
    const bodyRef = useRef();
    useClickOutside(bodyRef, onClose);
    useDisableScroll();
    return createPortal(
      <div className="fadein modal">
        <div className="modal__shadow-bg" />
        <div
          ref={bodyRef}
          style={style}
          className={cn(className, "modal__body")}
        >
          <div className="modal__close-wrapper">
            <span className="modal__close" onClick={onClose} />
          </div>
          <Component {...rest} />
        </div>
      </div>,
      modalRoot
    );
  };
  return Modal;
};

export default ModalHOC;
