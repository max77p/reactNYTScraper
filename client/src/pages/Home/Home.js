import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Results from "../../components/Results";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props){
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      search: "",
      records:"",
      startYear:"",
      endYear:""
    };
  }

  
  handleChange(event) {
    const target=event.target;
    const value=target.value;
    const name=target.name;
    this.setState({
      [name]:value
    });
  }

  handleSearch=event=>{
    event.preventDefault();
  console.log("button was clicked");
  console.log(this.state.search);
  console.log(this.state.records);
  }

  render() {
    return ([
      <Jumbotron />,
      <div className="panel panel-info">
            <div className="panel-heading"><i className="far fa-newspaper fa-fw ficon"></i>Search Parameters</div>
            <div className="panel-body">
                  <form onSubmit={this.handleSearch}>
                    <div className="form-group">
                        <label htmlFor="searchTerm">Search Term:</label>
                        <input type="text" className="form-control" id="searchTerm" aria-describedby="emailHelp" placeholder="search" value={this.state.search} onChange={this.handleChange} name="search"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numberRecords">Number of Records to Retrieve (Optional):</label>
                        <input type="number" min="0" max="10" className="form-control" id="numberOfRecords" placeholder="maximum of 10 records" value={this.state.records} onChange={this.handleChange} name="records"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startYear">Start Year (Optional):</label>
                        <input type="date" className="form-control" id="startYear" placeholder="YYYYMMDD"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="endYear">End Year (Optional):</label>
                        <input type="date" className="form-control" id="endYear" placeholder="YYYYMMDD"/>
                    </div>

                    <button type="submit" className="btn btn-primary searchBtn" onClick={this.handleSearch}>
                        <i className="fas fa-search fa-fw ficon"></i>Search</button>
                    <button type="submit" className="btn btn-primary clearBtn">
                        <i className="far fa-trash-alt fa-fw ficon"></i>Clear</button>
                </form>
            </div>
        </div>,
        <Results/>
            
    ])
  }
}

export default Home;
