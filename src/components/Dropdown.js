import React from "react";

const Dropdown = ({onChangeDropDown}) => {
  const onClickDropDown = (e) =>{
    const {value} = e.target
    onChangeDropDown(value)
    
  }
  return (
    <div className="dropdown  ">
      <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        onChange={(e) =>onClickDropDown(e)}
      >
        <option  >
          Open this select menu
        </option>
        <option value="all">All</option>
        <option value="finish">Finish</option>
        <option value="unfinish">Unfinish</option>
        <option value="alphabel">alphabet</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

export default Dropdown;
