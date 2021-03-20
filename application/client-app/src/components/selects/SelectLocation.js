import React from "react";
import Select, { components } from "react-select";
import cn from "classnames";
import { LOCATIONS } from "../../../shared/locations";
import "./SelectLocation.scss";

const options = LOCATIONS.map(({ id, name }) => ({ value: id, label: name }));

const customStyles = {
  container: (provided, state) => ({
    background: state.selectProps.menuIsOpen ? "#ffffff" : "#000000",
  }),
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

const SelectLocation = ({ className, onChange }) => (
  <Select
    styles={customStyles}
    className={cn("select-location-container", className)}
    classNamePrefix="select-location"
    placeholder="Ваше місто"
    hideSelectedOptions={true}
    isSearchable={false}
    components={{
      IndicatorSeparator: () => null,
      DropdownIndicator: Indicator,
    }}
    options={options}
    onChange={onChange}
  />
);

export default SelectLocation;
