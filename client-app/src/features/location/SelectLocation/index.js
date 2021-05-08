import Select, { components } from "react-select";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { getLocationName } from "../../../common/selectors";
import { locationActions } from "../locationSlice";
import "./style.scss";

export const LOCATIONS = [
  { id: 1, name: "Фастів" },
  { id: 2, name: "Київ" },
  { id: 3, name: "Львів" },
  { id: 4, name: "Дніпро" },
  { id: 5, name: "Одеса" },
  { id: 6, name: "Суми" },
  { id: 7, name: "Харків" },
];

const options = LOCATIONS.map(({ id, name }) => ({ value: id, label: name }));

const customStyles = {
  container: () => ({}),
  dropdownIndicator: () => ({}),
  indicatorsContainer: () => ({}),
  menu: () => ({}),
  menuList: () => ({}),
  control: () => ({}),
  option: () => ({}),
  placeholder: () => ({}),
  singleValue: () => ({}),
  valueContainer: () => ({}),
};

const Indicator = (props) => (
  <components.DropdownIndicator {...props}>
    <span></span>
  </components.DropdownIndicator>
);

export const SelectLocation = ({ className }) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const selectRef = useRef(null);
  const location = useSelector(getLocationName);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleMouseEnter() {
      this.classList.add("active");
    }
    function handleMouseLeave() {
      this.classList.remove("active");
    }
    if (selectRef && selectRef.current) {
      selectRef.current.addEventListener("mouseenter", handleMouseEnter);
      selectRef.current.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        selectRef.current.removeEventListener("mouseenter", handleMouseEnter);
        selectRef.current.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [selectRef]);
  const PLACEHOLDER = "Ваше місто";
  return (
    <div
      ref={selectRef}
      className={cn(className, "select-location", {
        active: isSelectOpened,
      })}
    >
      <div
        className="select-location__control select-location__control--static"
        onClick={() => setIsSelectOpened(!isSelectOpened)}
      >
        <div className="select-location__value-container">
          {location || PLACEHOLDER}
        </div>
        <div className="select-location__indicator"></div>
      </div>
      <Select
        styles={customStyles}
        className={cn("select-location__container")}
        classNamePrefix="select-location"
        placeholder={PLACEHOLDER}
        hideSelectedOptions={true}
        isSearchable={false}
        menuIsOpen={true}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: Indicator,
        }}
        options={options}
        onMenuClose={() => {
          setIsSelectOpened(false);
        }}
        onChange={({ value, label }) => {
          dispatch(locationActions.setLocation(value, label));
        }}
      />
    </div>
  );
};

export default SelectLocation;
