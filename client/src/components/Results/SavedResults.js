import React from "react";
import "./Results.css";
import List from "../List";

export const SavedResults = props => {
  let content = [];
  console.log(props.articles);
  console.log(Object.keys(props.articles))
  if (props.articles) {
    // content.push(<List articles={this.state.articles} />);
    props.articles.map(x => {
      var pubdate;
      var author;
      // console.log(x)
      if ("pubdate" in x) {//check if publication date exists
        console.log(x.pubdate);
        pubdate = x.pubdate.slice(0, 10);
        console.log(pubdate);
      } else {
        pubdate = "Publication date not available";
      }

      if ("author" in x) {//check if author name exists in database
        author = x.author;
        console.log(author);
      } else {
        author = "Author not available";
      }
      content.push(<List articles={x} key={x._id} pubdate={pubdate} author={author} click={props.click} setting="saved"/>);
    });
  }

  return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <i className="far fa-newspaper fa-fw ficon" /> {props.heading}
      </div>
      <div className="panel-body articleSection" />
      <ol className="ordered list-group">{content}</ol>
    </div>
  );
};

