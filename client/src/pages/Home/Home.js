import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Results from "../../components/Results";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      search: "",
      records: "",
      startYear: "",
      endYear: "",
      articles: []
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSearch = event => {
    event.preventDefault();
    console.log("button was clicked");
    var queryURL;
    var search = this.state.search;
    var records = this.state.records;
    var startyear = this.state.startYear;
    var endyear = this.state.endYear;

    var queryUrl;
    if (search && !startyear && !endyear) {
      //gives whatever search
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search;
    } else if (search && startyear && endyear) {
      //gives specific search
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&begin_date=" +
        startyear +
        "&end_date=" +
        endyear;
    } else if (search && startyear && !endyear) {
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&begin_date=" +
        startyear;
    } else if (search && !startyear && endyear) {
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&end_date=" +
        endyear;
    } else {
      alert("please input at least search"); //tells user to at least put search item
    }

    axios.get(queryURL).then(res => {
      //   console.log(Object.keys(res));
      //   console.log(res);
      //   console.log(res.data.response.docs);
      var data = res.data.response.docs;

      this.setState(prevState => {
        return {
          articles: [...prevState.articles, ...data]
        };
      });
      
    }).then(x=>{
        // console.log(this.state.articles);
        console.log(x);
    })
  };

  render() {
    return [
      <Jumbotron />,
      <div className="panel panel-info">
        <div className="panel-heading">
          <i className="far fa-newspaper fa-fw ficon" />
          Search Parameters
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSearch}>
            <div className="form-group">
              <label htmlFor="searchTerm">Search Term:</label>
              <input
                type="text"
                className="form-control"
                id="searchTerm"
                aria-describedby="emailHelp"
                placeholder="search"
                value={this.state.search}
                onChange={this.handleChange}
                name="search"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberRecords">
                Number of Records to Retrieve (Optional):
              </label>
              <input
                type="number"
                min="0"
                max="10"
                className="form-control"
                id="numberOfRecords"
                placeholder="maximum of 10 records"
                value={this.state.records}
                onChange={this.handleChange}
                name="records"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startYear">Start Year (Optional):</label>
              <input
                type="date"
                className="form-control"
                id="startYear"
                placeholder="YYYYMMDD"
                value={this.state.startYear}
                onChange={this.handleChange}
                name="startYear"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endYear">End Year (Optional):</label>
              <input
                type="date"
                className="form-control"
                id="endYear"
                placeholder="YYYYMMDD"
                value={this.state.endYear}
                onChange={this.handleChange}
                name="endYear"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary searchBtn"
              onClick={this.handleSearch}
            >
              <i className="fas fa-search fa-fw ficon" />
              Search
            </button>
            <button type="submit" className="btn btn-primary clearBtn">
              <i className="far fa-trash-alt fa-fw ficon" />
              Clear
            </button>
          </form>
        </div>
      </div>,
      <Results articles={this.state.articles}/>
    ];
  }
}

export default Home;
