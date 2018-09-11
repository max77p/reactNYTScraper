import React from "react";
import "./Jumbotron.css";
const Jumbotron = props => {
  return (
    <div className="jumbostyle">
      <div className="jumbotron">
        <h1 className="display-4">
          <i className="far fa-newspaper fa-fw ficon" /> {props.heading}
        </h1>
      </div>
    </div>
  );
};

export default Jumbotron;
