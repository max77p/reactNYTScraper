import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    this.loadArticles();
  }
  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.articles);
    return (
      <div className="container">
        <h1>test</h1>
      </div>
    );
  }
}

export default Saved;
