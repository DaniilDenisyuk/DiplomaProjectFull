import React from "react";
import Select, { components } from "react-select";
import { LANGUAGES } from "../../../shared/languages";
import cn from "classnames";
import "./selectLanguage.scss";

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
  container: (provided, state) => ({
    background: state.selectProps.menuIsOpen ? "#ffffff" : "#000000",
  }),
  menu: () => ({}),
  menuList: () => ({}),
  control: () => ({}),
  option: () => ({}),
  placeholder: () => ({}),
  singleValue: () => ({}),
  valueContainer: () => ({}),
};

const selectLanguage = ({ className, onChange }) => (
  <Select
    styles={customStyles}
    className={cn("select-language-container", className)}
    classNamePrefix="select-language"
    defaultValue={options[0]}
    hideSelectedOptions={true}
    isSearchable={false}
    components={{
      IndicatorSeparator: () => null,
      indicatorsContainer: () => null,
      DropdownIndicator: () => null,
      clearIndicator: () => ({}),
      Option: LangOption,
      SingleValue: langValue,
    }}
    options={options}
    onChange={onChange}
  />
);

export default selectLanguage;
