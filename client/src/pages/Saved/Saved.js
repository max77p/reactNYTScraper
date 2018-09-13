import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { SavedResults } from "../../components/Results";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import io from "socket.io-client";
const socket = io.connect("https://nytreactapp2018.herokuapp.com");

class Saved extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      articles: [],
      activeClass:1
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
    // console.log("delete btn");
    // console.log(id);
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  render() {
    // console.log(this.state.articles);
    return [
      <Nav activeclass={this.state.activeClass}/>,
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
