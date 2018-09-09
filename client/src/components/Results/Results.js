import React from "react";
import "./Results.css";
import List from "../List";

const Results = props => {
  let content = [];
  console.log(props.articles);
  if (props.articles) {
    // content.push(<List articles={this.state.articles} />);
    props.articles.map(x => {
      var pubdate;
      var author;
      // console.log(x)
      if ("pub_date" in x) {//check if publication date exists
        pubdate = x.pub_date.slice(0, 10);
        console.log(pubdate);
      } else {
        pubdate = "Publication date not available";
      }

      if ("byline" in x) {//check if author name exists in database
        author = x["byline"].original;
        console.log(author);
      } else {
        author = "Author not available";
      }
      content.push(<List articles={x} key={x._id} pubdate={pubdate} author={author} click={props.click}/>);
    });
  }

  return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <i className="far fa-newspaper fa-fw ficon" />
        Top Articles
      </div>
      <div className="panel-body articleSection" />
      <ol className="ordered list-group">{content}</ol>
    </div>
  );
};

export default Results;
