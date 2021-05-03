import "Loading.scss";
import cn from "classnames";

const Loading = ({ className, message }) => (
  <p className={cn(className, "loading")}>
    {message ? message : "Загрузка"}
    <span className="loading__dots"></span>
  </p>
);

export default Loading;
