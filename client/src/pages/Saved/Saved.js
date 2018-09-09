import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { SavedResults } from "../../components/Results";
import Jumbotron from "../../components/Jumbotron";

class Saved extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      articles: []
    };
  }
  componentDidMount() {
    this.loadArticles();
  }
  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete = (event, id) => {
    // event.preventDefault();
    console.log("delete btn");
    console.log(id);
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state.articles);
    return [
      <Jumbotron heading="Saved" />,
      <SavedResults
        heading="Saved Articles"
        articles={this.state.articles}
        click={this.handleDelete}
      />
    ];
  }
}

export default Saved;
