import React from "react";
import "./Results.css";
import List from "../List";

export const Results = props => {
  let content = [];
  // console.log(props.articles);
  // console.log(Object.keys(props.articles))
  if (props.articles) {
    // content.push(<List articles={this.state.articles} />);
    props.articles.map(x => {
      var pubdate;
      var author;
      // console.log(x)
      if ("pub_date" in x) {
        //check if publication date exists
        pubdate = x.pub_date.slice(0, 10);
        // console.log(pubdate);
      } else {
        pubdate = "Publication date not available";
      }

      if ("byline" in x) {
        //check if author name exists in database
        author = x["byline"].original;
        // console.log(author);
      } else {
        author = "Author not available";
      }
      content.push(
        <List
          articles={x}
          key={x._id}
          pubdate={pubdate}
          author={author}
          click={props.click}
          setting="search"
        />
      );
    });
  }

  return ([
    <div className="panel panel-info">
      <div className="panel-heading">
        <i className="far fa-newspaper fa-fw ficon" /> {props.heading}
      </div>
      <div className="panel-body articleSection" />
      <ol className="ordered list-group">{content}</ol>
    </div>
//   <nav aria-label="...">
//   <ul class="pagination">
//     <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
//     <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
//   </ul>
// </nav>
  ]);
};
