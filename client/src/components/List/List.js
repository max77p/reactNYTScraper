import React from "react";
import "./List.css";
import Button from "../Button";

const List = props => {
  // console.log(props.articles);

  return (
    <li className="eachArticle list-group-item">
      <div className="row listRow">
        <div className="col-md-6 blockLeft">
          <a href={props.articles.web_url}>{props.articles.snippet}</a>
          <p>Publication date: {props.pubdate}</p>
          <p>Author: {props.author}</p>
        </div>
        <div className="col-md-6 blockRight">
          <Button click={props.click} id={props.articles._id} title={props.articles.snippet} link={props.articles.web_url} pubdate={props.pubdate} author={props.author}/>
        </div>
      </div>
    </li>
  );
};

export default List;
