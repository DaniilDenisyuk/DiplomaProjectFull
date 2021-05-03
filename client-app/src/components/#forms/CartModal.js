import React, { PureComponent } from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import CartItem from "../cards/CartItem";

export const CartModal = (props, { linkTo }) => {
  return (
    <section class="bucket-popup" id="bucket-popup">
      <div class="bucket-popup__wrapper">
        <div class="bucket-popup__heading">
          <p>Кошик</p>
          <div class="bucket-popup__close-btn"></div>
        </div>
        <ul class="bucket-popup__items"></ul>
        <section class="bucket-popup__result bp-res">
          <p class="bp-res__sum">Сума: {props.sum} грн.</p>
          <button value="Замовити" class="bp-res__order-btn" />
        </section>
      </div>
    </section>
  );
};

const mapState = () => {};
const mapDispatch = {};
