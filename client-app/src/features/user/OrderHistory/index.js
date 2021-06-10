import { useState, useEffect } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory, getToken } from "../../../common/selectors";
import { historyActions } from "./historySlice";
import HistoryItem from "../HistoryItem";
import Loading from "../../../components/Loading";
import "./style.scss";

const OrderHistory = ({ className }) => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const { isLoading, isFailed, isSucceeded, history } =
    useSelector(getOrderHistory);
  useEffect(() => {
    if (!isSucceeded) {
      dispatch(historyActions.getOrderHistory(token));
    }
  }, [token, isSucceeded]);
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
