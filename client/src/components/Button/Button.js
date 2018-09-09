import React from "react";
import "./Button.css";

const Button = props => {
  // console.log(props);

  return (
    <button type="button" className="btn btn-default saveBtn" onClick={props.click} data-id={props.id} data-title={props.title} data-pubdate={props.pubdate} data-author={props.author}>
      Save
    </button>
  );
};

export default Button;
