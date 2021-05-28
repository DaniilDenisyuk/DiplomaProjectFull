import { useState, useEffect } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { getOrderHistory, getToken } from "../../../common/selectors";
import { userActions } from "../userSlice";
import HistoryItem from "../HistoryItem";
import Loading from "../../../components/Loading";
import "./style.scss";

const OrderHistory = ({ className }) => {
  const token = useSelector(getToken);
  const { isLoading, isFailed, isSucceeded, history } =
    useSelector(getOrderHistory);

  // useEffect(() => {
  //   if (!isSucceed) {
  //     userActions.getFavoriteDishes(token);
  //   }
  // }, [token, isSucceed]);

  const historyItems = history.map((item) => (
    <HistoryItem
      className="order-history__item"
      item={item}
      key={`order-${item.id}`}
    />
  ));

  return (
    <ul className={cn(className, "order-history")}>
      {isLoading && (
        <Loading message="Завантаження" className="order-history__message" />
      )}
      {isFailed && <p className="order-history__message">Сталася помилка</p>}
      {isSucceeded && historyItems}
    </ul>
  );
};

export default OrderHistory;
