import React from "react";

const Dropdown = ({dropDown}) => {

  return (
    <div className="dropdown  ">
      <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
      >
        <option onClick={(e) => dropDown(e)} >
          Open this select menu
        </option>
        <option value="all">All</option>
        <option value="finish">Finish</option>
        <option value="unfinish">Unfinish</option>
        <option value="alphabel">alphabel</option>
      </select>
    </div>
  );
};

export default Dropdown;
