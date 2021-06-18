import cn from "classnames";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOrderItemsSum,
  getOrderItemsCount,
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
            <Loading className="form__submitting" message="Обробка" />
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
  const dispatch = useDispatch();
  const name = useSelector(getUserFirstName);
  const phone = useSelector(getUserPhone);
  const address = useSelector(getUserFullAddress);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      delivery_way: "",
      payment_way: "",
      customer_name: name,
      customer_phone: phone,
      delivery_address: address,
    },
  });
  const orderItemsId = useSelector(getOrderItemsId);
  const orderAuxItemsId = useSelector(getOrderAddsId);
  const sum = useSelector(getOrderItemsSum);
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
  useEffect(() => {
    setValue("customer_name", name);
    setValue("customer_phone", phone);
    setValue("address", address);
  }, [name, phone, address, setValue]);
  const items = useSelector(getOrderItemsCount());
  const onSubmit = async (order) => {
    const fields = { ...order, order_price: sum, items };
    await ordersService.createOrder(fields);
    reset();
    dispatch(orderActions.reset());
  };
  const onError = (errors, e) => console.log("not succeed", errors, e);

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
                    ...register("delivery_way", { required: true }),
                    type: "radio",
                    value: "delivery",
                  }}
                  label="Самовивіз"
                />
                <FormGroup
                  className="ccheckout__radio-group"
                  inputProps={{
                    ...register("delivery_way", { required: true }),
                    type: "radio",
                    value: "self",
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
                    dirty: !!watch("delivery_address"),
                  })}
                  inputProps={{
                    ...register("delivery_address", { required: false }),
                    type: "text",
                  }}
                  error={
                    errors.delivery_address && errors.delivery_address.message
                  }
                  label="Адреса"
                />
              </div>
              <div className="checkout__pay-way">
                <p className="checkout__sub-heading">Спосіб оплати</p>
                <FormGroup
                  className="checkout__radio-group"
                  inputProps={{
                    ...register("payment_way", { required: true }),
                    type: "radio",
                    value: "cash",
                  }}
                  label="Оплата при отриманні"
                />
                <FormGroup
                  className="checkout__radio-group"
                  inputProps={{
                    ...register("payment_way", { required: true }),
                    type: "radio",
                    value: "bank card",
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
