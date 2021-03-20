import cn from "classnames";
import CounterButton from "./buttons/CounterButton";

const ItemCounter = ({ className, value, handleChange, outlinedBtn }) => (
  <div className={cn(className, "item-counter")}>
    <CounterButton
      className="item-counter__btn"
      outlined={outlinedBtn}
      disabled={value === 0}
      onClick={() => handleChange(-1)}
    />
    <p className="item-counter__value">{value}</p>
    <CounterButton
      className="item-counter__btn"
      outlined={outlinedBtn}
      isIncrease
      onClick={() => handleChange(1)}
    />
  </div>
);

export default ItemCounter;
