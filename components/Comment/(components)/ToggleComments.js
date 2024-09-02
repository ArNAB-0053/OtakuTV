import React from "react";
import "@/styles/ToggleComments.css";

const ToggleComments = ({ isChecked, onChange }) => {
  return (
    <input
      class="switch"
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
    />
  );
};

export default ToggleComments;
