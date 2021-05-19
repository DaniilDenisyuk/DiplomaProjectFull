import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import cn from "classnames";
import { useState } from "react";
import "./style.scss";

SwiperCore.use([Navigation]);

const ItemSlider = ({
  className,
  items,
  itemComponent: Component,
  spaceBetween,
}) => {
  const [isOnEnd, setIsOnEnd] = useState(false);
  const [isOnStart, setIsOnStart] = useState(true);

  const slides = items.map((item, index) => (
    <SwiperSlide className="item-slider__slide" key={`slide-${index}`}>
      <Component item={item} />
    </SwiperSlide>
  ));
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={4}
      className={cn(className, "item-slider")}
      navigation={{
        prevEl: ".item-slider__prev-el",
        nextEl: ".item-slider__next-el",
      }}
      onReachEnd={() => setIsOnEnd(true)}
      onReachStart={() => setIsOnStart(true)}
      onSlideChange={({ isBeginning, isEnd }) => {
        if (isBeginning) {
          setIsOnStart(true);
        } else if (isOnStart) {
          setIsOnStart(false);
        }
        if (isEnd) {
          setIsOnEnd(true);
        } else if (isOnEnd) {
          setIsOnEnd(false);
        }
      }}
    >
      {slides}
      <span
        className={cn("item-slider__prev-el", {
          disabled: isOnStart,
        })}
      />
      <span
        className={cn("item-slider__next-el", {
          disabled: isOnEnd,
        })}
      />
      {!isOnStart && <span className="item-slider__veil-start" />}
      {!isOnEnd && <span className="item-slider__veil-end" />}
    </Swiper>
  );
};

export default ItemSlider;
