import React from "react";

function Checkbox({ onClick, defaultChecked }) {
  return (
    <input type="checkbox" onClick={onClick} defaultChecked={defaultChecked} />
  );
}

export default Checkbox;
