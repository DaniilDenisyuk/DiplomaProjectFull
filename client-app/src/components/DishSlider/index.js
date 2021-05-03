import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import DishCard from "../DishCard";
import "./style.scss";

const DishSlider = ({ dishes, onCardClick, onButtonClick }) => {
  const [isReachEnd, setIsReachEnd] = useState(false);
  const [isReachStart, setIsReachStart] = useState(true);

  const dishSlides = dishes.map((dish, index) => (
    <SwiperSlide key={`slide-${dish.category}-${dish.id}`} virtualIndex={index}>
      <DishCard
        dishImg={dish.imgs[0]}
        dishName={dish.name}
        dishDescription={dish.description}
        dishPrice={dish.price}
        onCardClick={(e) => onCardClick(dish.id, e)}
        onButtonClick={(e) => onButtonClick(dish.id, e)}
      />
    </SwiperSlide>
  ));
  return (
    <Swiper
      onReachBeginning={() => {
        setIsReachStart(true);
      }}
      onReachEnd={() => {
        setIsReachEnd(true);
      }}
      className="dish-slider"
      wrapperClass="dish-slider__wrapper"
      slideClass="dish-slider__slide"
      navigation={{
        prevEl: "dish-slider__prev-el",
        nextEl: "dish-slider__next-el",
      }}
      virtual
    >
      {!isReachStart && <span className="dish-slider__veil-start" />}
      {!isReachEnd && <span className="dish-slider__veil-end" />}
      {dishSlides}
    </Swiper>
  );
};

export default DishSlider;
