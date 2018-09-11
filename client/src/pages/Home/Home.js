import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import Notif from "../../components/Notif";
import { Results } from "../../components/Results";
import "./Home.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleclose = this.handleclose.bind(this);

    this.state = {
      search: "",
      records: "",
      startYear: "",
      endYear: "",
      articles: [],
      activeClass: 0,
      articlesaved: null,
      prevalert: null,
      onoff: false,
      currsearch: "",
      prevsearch: "",
      searched: 0
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

  componentDidMount() {
    this.loaddata();
  }

  loaddata = eldata => {
    console.log("updated");
    socket.on("send to all", data => {
      //   console.log(data);
      this.setState(prevState => {
        return {
          articlesaved: data,
          prevalert: prevState.articlesaved,
          onoff: true
        };
      });

      setTimeout(() => {
        this.setState({
          onoff: false
        });
      }, 5000);
    });
  };

  handleSearch = event => {
    event.preventDefault();
    // console.log("button was clicked");

    var queryURL;
    var search = this.state.search;
    var records = this.state.records;
    var startyear = this.state.startYear;
    var endyear = this.state.endYear;

    this.setState(prevState => {
      return {
        searched: prevState.searched + 1,
        currsearch: search
      };
    });

    console.log(this.state.searched);
    console.log(this.state.currsearch);

    if (search && !startyear && !endyear) {
      //gives whatever search
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&sort=newest" +
        "&page=" +
        this.state.searched;
    } else if (search && startyear && endyear) {
      //gives specific search
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&begin_date=" +
        startyear +
        "&end_date=" +
        endyear +
        "&sort=newest" +
        "&page=" +
        this.state.searched;
    } else if (search && startyear && !endyear) {
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&begin_date=" +
        startyear +
        "&sort=newest" +
        "&page=" +
        this.state.searched;
    } else if (search && !startyear && endyear) {
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
        "&q=" +
        search +
        "&end_date=" +
        endyear +
        "&sort=newest" +
        "&page=" +
        this.state.searched;
    } else {
      alert("please input at least search"); //tells user to at least put search item
    }

    axios.get(queryURL).then(res => {
      //   console.log(Object.keys(res));
      //   console.log(res);
      console.log(res.data.response.docs);
      var data = res.data.response.docs;
      if (records > 0) {
        data = data.splice(0, records);
      }
      console.log(data);
      this.setState(prevState => {
        console.log([...prevState.articles]);
        return {
          articles: [...prevState.articles, ...data]
        };
      });
    });
  };

  handleSave = event => {
    event.preventDefault();
    // this.send();
    console.log("save btn was clicked");
    console.log(event.target.getAttribute("data-id"));
    var id = event.target.getAttribute("data-id");

    // console.log(this.state.articles);
    this.state.articles.map(x => {
      console.log(x);
      var pubdate;
      var author;
      var snippet;
      if (x._id === id) {
        // console.log(x.snippet);
        // console.log(x.web_url);
        // console.log(x.pub_date);
        // console.log(x["byline"].original);

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

        if (x.snippet !== "") {
          snippet = x.snippet;
        } else {
          snippet = "No Title available";
        }
        API.saveArticle({
          snippet: snippet,
          link: x.web_url,
          pubdate: pubdate,
          author: author
        })
          .then(res => {
            console.log(res);
            socket.emit("saved", res.data.snippet);
            //  this.send();
          })
          .catch(err => console.log(err.response));
      }
    });
  };

  handleClear = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        articles: []
      };
    });
  };

  handleclose = event => {
    event.preventDefault();
    console.log(this.state.onoff);
  };

  render() {
    let show = null;
    // console.log(this.state.articlesaved);
    // console.log(this.state.prevalert);
    if (this.state.articlesaved === this.state.prevalert) {
      console.log("they are equal");
    } else {
      show = (
        <Notif
          saved={this.state.articlesaved}
          click={this.handleclose}
          value={this.state.onoff}
        />
      );
      console.log("not equal");
    }

    return [
      show,
      <Nav
        activeclass={this.state.activeClass}
        saved={this.state.articlesaved}
      />,
      <Jumbotron heading="New York Times Search" />,
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
            <button
              type="submit"
              className="btn btn-primary clearBtn"
              onClick={this.handleClear}
            >
              <i className="far fa-trash-alt fa-fw ficon" />
              Clear
            </button>
          </form>
        </div>
      </div>,
      <Results
        articles={this.state.articles}
        click={this.handleSave}
        heading="Top Articles"
      />
    ];
  }
}

export default Home;
