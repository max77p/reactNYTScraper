import React from "react";
import "./List.css";
import Button from "../Button";

const List = props => {
  // console.log(props.articles);

  return (
    <li className="eachArticle list-group-item">
      <div className="row listRow">
        <div class="col-md-6 blockLeft">
          <a href={props.articles.web_url}>{props.articles.snippet}</a>
          <p>Publication date: {props.pubdate}</p>
          <p>Author: {props.author}</p>
        </div>
        <div class="col-md-6 blockRight">
          <Button />
        </div>
      </div>
    </li>
  );
};

export default List;
