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
      defaultRecord: 10,
      startYear: "",
      endYear: "",
      articles: [],
      activeClass: 0,
      articlesaved: null,
      prevalert: null,
      onoff: false,
      currsearch: "",
      prevsearch: "",
      page: 0,

      data: [],
      hold: null,
      show: null,
      counter: 0
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
    var priorterm = sessionStorage.getItem("search");

    if (!this.state.records) {
      this.setState({
        records: this.state.defaultRecord
      });
    }
    var records = this.state.records;
    var search = this.state.search;
    var dataSession = JSON.parse(sessionStorage.getItem("setData"));
    var searchSession = sessionStorage.getItem("search");

    // var startyear = this.state.startYear;
    // var endyear = this.state.endYear;
    console.log("prior search term is: " + priorterm);
    console.log("current search term is: " + search);
    console.log("records chosen: " + records);
    console.log("after refresh data: " + this.state.data);

    if (priorterm !== search) {
      //reset pagination and everything else if search term is different
      console.log("changed search");
      this.setState(
        prevState => {
          return {
            page: 0,
            articles: [],
            data: [],
            hold: null,
            show: null,
            counter: 0
          };
        },
        function() {
          sessionStorage.setItem("setData", JSON.stringify(this.state.data));
          this.apiCall();
        }
      );
    } else if (
      priorterm === search &&
      (this.state.data.length == 0 || records > dataSession.length) //if search term is same again and temp data is empty or record requested is greater than temp data avail
    ) {
      this.setState(
        prevState => {
          return {
            page: prevState.page + 1
          };
        },
        function() {
          this.apiCall();
        }
      );
    } else {
      this.apiCall();
    }
  };

  apiCall = () => {
    var queryURL;

    var search = this.state.search;
    var dataSession = JSON.parse(sessionStorage.getItem("setData"));
    var records = this.state.records;
    var startyear = this.state.startYear;
    var endyear = this.state.endYear;

    if (this.state.data.length == 0 || records > dataSession.length) {
      console.log("pagination is: " + this.state.page);

      if (search && !startyear && !endyear) {
        //gives whatever search
        queryURL =
          "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
          "&q=" +
          search +
          "&sort=newest" +
          "&page=" +
          this.state.page;
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
          this.state.page;
      } else if (search && startyear && !endyear) {
        queryURL =
          "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
          "&q=" +
          search +
          "&begin_date=" +
          startyear +
          "&sort=newest" +
          "&page=" +
          this.state.page;
      } else if (search && !startyear && endyear) {
        queryURL =
          "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
          "&q=" +
          search +
          "&end_date=" +
          endyear +
          "&sort=newest" +
          "&page=" +
          this.state.page;
      } else {
        alert("please input at least search"); //tells user to at least put search item
      }

      axios.get(queryURL).then(res => {
        //   console.log(Object.keys(res));
        //   console.log(res);
        console.log(res.data.response.docs);
        var x = res.data.response.docs;
        this.setState(
          prevState => {
            return {
              data: [...prevState.data, ...x],
              counter: prevState.counter + x.length //leftover plus length of new items stored
              // records: records
            };
          },
          function() {
            console.log(this.state.data);
            sessionStorage.setItem("setData", JSON.stringify(this.state.data));
            sessionStorage.setItem("search", search);
            this.postToScreen(records, this.state.data);
          }
        );
      });
    } else {
      var data = JSON.parse(sessionStorage.getItem("setData"));
      this.postToScreen(records, data);
    }
  };

  postToScreen = (records, data) => {
    if (this.state.records <= data.length) {
      console.log("counter: " + this.state.counter);
      console.log("thisrecordsRequested: " + this.state.records);
      console.log("leftovertoshow: " + data.length);

      // var data = JSON.parse(sessionStorage.getItem("setData"));
      // var data=this.state.data;
      console.log(data);
      // if this.data has items, then check if number of records requested by user is greater than 0 but less than 10, fo so show only that amount, keep rest in temp hold
      var show = data.slice(0, records); //number to show depending on record requested
      var hold = data.slice(records, data.length + 1); //remainder to store here
      this.setState(
        prevState => {
          return {
            show: show,
            data: hold,
            counter: prevState.counter - show.length //keep left over amount of items count in here, should be same length as data
          };
        }, //end of this setstate
        function() {
          console.log("to show this: " + this.state.show);
          console.log("new counter: " + this.state.counter);
          var data1 = sessionStorage.setItem(
            "setData",
            JSON.stringify(this.state.data)
          );
          console.log("after setting: " + data1);
          this.setState(
            prevState => {
              //send to articles array in state so component can mount the articles
              console.log([...prevState.articles]);
              return {
                articles: [...prevState.articles, ...this.state.show]
              };
            },
            function() {
              console.log("final left over: " + this.state.data); //check to see what is left over
              var dataSession = JSON.parse(sessionStorage.getItem("setData"));
              console.log("final localget: " + dataSession);
            }
          ); //end of setstate
        }
      );
    } //end of first if statement
    else {
    }
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
          .catch(err => {
            console.log(err.response);
            console.log(err.response.data.errmsg);
          });
      }
    });
  };

  handleClear = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        articles: [],
        searched: 0,
        search: "",
        records: "",
        startYear: "",
        endYear: ""
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
