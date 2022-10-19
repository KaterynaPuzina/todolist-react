import React from "react";

function Checkbox({ key, id, onClick, defaultChecked }) {
  return (
    <input
      key={key}
      id={id}
      type="checkbox"
      onClick={onClick}
      defaultChecked={defaultChecked}
    />
  );
}

export default Checkbox;
