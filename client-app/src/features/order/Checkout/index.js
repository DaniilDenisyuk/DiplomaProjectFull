import cn from "classnames";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  getOrderItemsSum,
  getOrderItemsId,
  getOrderAdd,
  getOrderAddsId,
  getUserFirstName,
  getUserPhone,
  getUserFullAddress,
  getOrderAddsSum,
  getOrderOverallSum,
} from "../../../common/selectors";
import { orderActions } from "../orderSlice";
import { ordersService } from "../../../services/ordersService";
import OrderItemCard from "../OrderItem";
import Button from "../../../components/Button";
import ItemCounter from "../../../components/ItemCounter";
import FormGroup from "../../../components/FormGroup";
import Loading from "../../../components/Loading";

import "./style.scss";

const OrderOverall = ({ className, onOrder }) => {
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(false);
  const sum = useSelector(getOrderItemsSum);
  const addsSum = useSelector(getOrderAddsSum);
  const overallSum = useSelector(getOrderOverallSum);
  return (
    <div
      className={cn(className, "order-overall", {
        "order-overall--active": active,
      })}
    >
      <div
        className="order-overall__dropdown"
        onClick={() => setActive(!active)}
      >
        <p className="order-overall__heading checkout__sub-heading">Сума</p>
        <span className="order-overall__dropdown-indicator"></span>
      </div>
      <div className="order-overall__wrapper">
        {active && (
          <div className="order-overall__composite">
            <p className="order-overall__sub">
              Товари:
              <span>{sum}&#8372;</span>
            </p>
            <p className="order-overall__sub">
              Додатки:
              <span>{addsSum}&#8372;</span>
            </p>
            <p className="order-overall__sub">
              Доставка:
              <span>{"0"}&#8372;</span>
            </p>
          </div>
        )}
        <p className="order-overall__full-sum">
          До сплати:
          <span>{overallSum}&#8372;</span>
        </p>

        <Button
          className="order-overall__submit-btn"
          primary
          rounded
          onClick={() => {
            setSubmitting(true);
            onOrder();
            setSubmitting(false);
          }}
        >
          {submitting ? (
            <Loading className="form__submitting" message="Замовити" />
          ) : (
            "Замовити"
          )}
        </Button>
      </div>
    </div>
  );
};

const AuxItem = ({ className, itemId }) => {
  const { name, price, count } = useSelector(getOrderAdd(itemId));
  const dispatch = useDispatch();
  return (
    <div className={className}>
      <p>{name}</p>
      <p>(+{price * count} &#8372;) </p>
      <ItemCounter
        className="order-item__counter"
        count={count}
        onChange={(value) =>
          dispatch(orderActions.changeAddsCount(itemId, value))
        }
        min={0}
        max={10}
      />
    </div>
  );
};

const Checkout = () => {
  const history = useHistory();
  const name = useSelector(getUserFirstName);
  const phone = useSelector(getUserPhone);
  const address = useSelector(getUserFullAddress);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: { delivery: 0, pay_way: 0, name, phone, address },
  });
  const orderItemsId = useSelector(getOrderItemsId);
  const orderAuxItemsId = useSelector(getOrderAddsId);
  const cards = orderItemsId.map((id) => (
    <OrderItemCard
      key={`item-${id}`}
      className="checkout__order-item"
      itemId={id}
    />
  ));
  const auxItems = orderAuxItemsId.map((id) => (
    <AuxItem
      key={`aux-item-${id}`}
      className="checkout__aux-item"
      itemId={id}
    />
  ));

  const onSubmit = async (order) => {
    console.log(order);
    await ordersService.createOrder({ ...order, items_id: orderItemsId });
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="checkout">
      <div className="__container">
        <p className="page-sub-heading">Оформлення замовлення</p>
        {orderItemsId.length < 1 ? (
          <div className="no-items">
            <p className="no-items__text">Немає що замовляти!</p>
            <Button
              className="no-items__button"
              secondary
              rounded
              onClick={() => history.push("/menu")}
            >
              Перейти в меню
            </Button>
          </div>
        ) : (
          <div className="checkout__wrapper">
            <div className="checkout__order">
              {cards.length > 0 && (
                <>
                  <div className="checkout__order-main">{cards}</div>
                  <div className="checkout__order-aux">{auxItems}</div>
                </>
              )}
            </div>
            <div className="checkout__right-col">
              <div className="checkout__delivery">
                <p className="checkout__sub-heading">Доставка</p>
                <FormGroup
                  className="checkout__radio-group"
                  inputProps={{
                    ...register("delivery", { required: true }),
                    type: "radio",
                    value: "0",
                  }}
                  label="Самовивіз"
                />
                <FormGroup
                  className="ccheckout__radio-group"
                  inputProps={{
                    ...register("delivery", { required: true }),
                    type: "radio",
                    value: "1",
                  }}
                  label="Кур'єр"
                />
              </div>
              <div className="checkout__info">
                <p className="checkout__sub-heading">Інформація</p>
                <FormGroup
                  className={cn("checkout__info-group", {
                    dirty: !!watch("customer_name"),
                  })}
                  inputProps={{
                    ...register("customer_name", { required: true }),
                    type: "text",
                  }}
                  error={errors.name && errors.name.message}
                  label="Ім'я"
                />
                <FormGroup
                  className={cn("checkout__info-group", {
                    dirty: !!watch("customer_phone"),
                  })}
                  inputProps={{
                    ...register("customer_phone", { required: true }),
                    type: "text",
                  }}
                  error={errors.customer_phone && errors.customer_phone.message}
                  label="Телефон"
                />
                <FormGroup
                  className={cn("checkout__info-group", {
                    dirty: !!watch("address"),
                  })}
                  inputProps={{
                    ...register("address", { required: true }),
                    type: "text",
                  }}
                  error={errors.address && errors.address.message}
                  label="Адреса"
                />
              </div>
              <div className="checkout__pay-way">
                <p className="checkout__sub-heading">Спосіб оплати</p>
                <FormGroup
                  className="checkout__radio-group"
                  inputProps={{
                    ...register("pay_way", { required: true }),
                    type: "radio",
                    value: "0",
                  }}
                  label="Оплата при отриманні"
                />
                <FormGroup
                  className="checkout__radio-group"
                  inputProps={{
                    ...register("pay_way", { required: true }),
                    type: "radio",
                    value: "1",
                  }}
                  label="Банківська карта"
                />
              </div>
              <OrderOverall
                className="checkout__overall"
                onOrder={formSubmit(onSubmit, onError)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
