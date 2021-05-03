import cn from "classnames";
import Button from "../Button";

const DishCard = ({
  className,
  dishName,
  dishDescription,
  dishImg,
  dishPrice,
  onCardClick,
  onButtonClick,
}) => (
  <section onClick={onCardClick} className={cn(className, "dish-card")}>
    <div className="dish-card__img">
      <img src={dishImg} alt={dishName} />
    </div>
    <h2 className="dish-card__name">{dishName}</h2>
    <p className="dish-card__description">{dishDescription}</p>
    <div className="row">
      <p className="dish-card__price">{dishPrice} грн.</p>
      <Button
        className="dish-card__add-button"
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick(e);
        }}
        text="В корзину"
      />
    </div>
  </section>
);

export default DishCard;
