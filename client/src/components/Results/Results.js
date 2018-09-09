import React from "react";
import "./Results.css";

const Results = props => {
  return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <i className="far fa-newspaper fa-fw ficon" />
        Top Articles
      </div>
      <div className="panel-body articleSection" />
      <ol className="ordered" />
    </div>
  );
};

export default Results;
