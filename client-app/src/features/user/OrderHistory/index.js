import cn from "classnames";
import { useSelector } from "react-redux";
import { getOrderHistory } from "../../../common/selectors";
import HistoryItem from "../HistoryItem";
import Loading from "../../../components/Loading";
import "./style.scss";

const OrderHistory = ({ className }) => {
  const { isLoading, isFailed, isSucceeded, history } =
    useSelector(getOrderHistory);

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
