import Select, { components } from "react-select";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { getLang } from "../../../common/selectors";
import { langActions } from "../langSlice";
import "./style.scss";

const LANGUAGES = {
  ua: require("../../../assets/img/flags/ua.svg").default,
  ru: require("../../../assets/img/flags/ru.svg").default,
  en: require("../../../assets/img/flags/uk.svg").default,
};

const options = [];

for (const [lang, flag] of Object.entries(LANGUAGES)) {
  options.push({ label: lang.toUpperCase(), value: lang, icon: flag });
}

const langValue = ({ children, ...props }) => {
  return (
    <components.SingleValue {...props}>
      <img
        src={props.data.icon}
        className="select-language__lang-icon"
        alt={props.data.label}
      />
      {children}
    </components.SingleValue>
  );
};

const LangOption = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.icon}
        className="select-language__lang-icon"
        alt={props.data.label}
      />
      {children}
    </components.Option>
  );
};

const customStyles = {
  container: () => ({}),
  menu: () => ({}),
  menuList: () => ({}),
  control: () => ({}),
  option: () => ({}),
  placeholder: () => ({}),
  singleValue: () => ({}),
  valueContainer: () => ({}),
};

export const SelectLanguage = ({ className, onChange }) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const selectRef = useRef(null);
  const lang = useSelector(getLang);
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
  return (
    <div
      ref={selectRef}
      className={cn(className, "select-language", {
        active: isSelectOpened,
      })}
    >
      <div
        className="select-language__control select-language__control--static"
        onClick={() => setIsSelectOpened(!isSelectOpened)}
      >
        <div className="select-language__value-container">
          <img
            src={LANGUAGES[lang]}
            className="select-language__lang-icon"
            alt={lang}
          />
          {lang.toUpperCase()}
        </div>
        <div className="select-language__indicator"></div>
      </div>
      <Select
        styles={customStyles}
        className={cn("select-language__container", className)}
        classNamePrefix="select-language"
        defaultValue={options[0]}
        hideSelectedOptions={true}
        menuIsOpen={true}
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null,
          indicatorsContainer: () => null,
          DropdownIndicator: () => null,
          clearIndicator: () => ({}),
          Option: LangOption,
          SingleValue: langValue,
        }}
        onMenuClose={() => {
          setIsSelectOpened(false);
        }}
        options={options}
        onChange={({ value }) => {
          dispatch(langActions.setLang(value));
        }}
      />
    </div>
  );
};

export default SelectLanguage;
