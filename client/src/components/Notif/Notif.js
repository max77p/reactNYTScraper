import React from "react";
import "./Notif.css";
const Notif = props => {
  console.log(props.value);
  if (!props.value) {
    return null;
  } else {
    return (
      <div
        id="message1"
        className={
          "alert alert-warning alert-dismissable flyover flyover-centered dontshow"
        }
      >
        <button
          type="button"
          className="close"
          data-hide="alert"
          aria-hidden="true"
          onClick={() => props.click}
        >
          ×
        </button>
        <strong>New Article saved!</strong>
        {props.saved}
      </div>
    );
  }
};

export default Notif;
