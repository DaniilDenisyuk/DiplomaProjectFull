import { useEffect } from "react";

const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
};

export const useDisableScroll = (condition = true) => {
  useEffect(() => {
    if (condition && isOverflown(document.body)) {
      document.body.classList.add("scroll-disabled");
    }
    // const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    // let supportsPassive = false;
    // try {
    //   window.addEventListener(
    //     "test",
    //     null,
    //     Object.defineProperty({}, "passive", {
    //       get: function () {
    //         supportsPassive = true;
    //       },
    //     })
    //   );
    // } catch (e) {}

    // const wheelOpt = supportsPassive ? { passive: false } : false;
    // const wheelEvent =
    //   "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    // const preventDefault = (e) => {
    //   e.preventDefault();
    // };
    // const preventDefaultForScrollKeys = (e) => {
    //   if (keys[e.keyCode]) {
    //     preventDefault(e);
    //     return false;
    //   }
    // };

    // const disableScroll = () => {
    //   window.addEventListener("DOMMouseScroll", preventDefault, false);
    //   window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    //   window.addEventListener("touchmove", preventDefault, wheelOpt);
    //   window.addEventListener("keydown", preventDefaultForScrollKeys, false);
    // };

    // const enableScroll = () => {
    //   window.removeEventListener("DOMMouseScroll", preventDefault, false);
    //   window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    //   window.removeEventListener("touchmove", preventDefault, wheelOpt);
    //   window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    // };
    // if (condition) {
    //   disableScroll();
    // }
    return () => {
      document.body.classList.remove("scroll-disabled");
      // enableScroll();
    };
  }, [condition]);
};
