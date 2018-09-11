import React from "react";
import "./Notif.css";
const Notif = props => {

  return (
    <div
      id="message1"
      className="alert alert-warning alert-dismissable flyover flyover-centered dontshow"
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        ×
      </button>
      <strong>New Article saved!</strong>{props.saved}
    </div>
  );
};

export default Notif;
