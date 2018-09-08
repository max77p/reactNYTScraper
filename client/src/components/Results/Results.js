import React from "react";
import "./Results.css";

const Results = props => {
  return (
    <div class="panel panel-info">
      <div class="panel-heading">
        <i class="far fa-newspaper fa-fw ficon" />
        Top Articles
      </div>
      <div class="panel-body articleSection" />
      <ol class="ordered" />
    </div>
  );
};

export default Results;
