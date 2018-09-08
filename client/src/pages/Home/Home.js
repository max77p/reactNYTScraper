import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Results from "../../components/Results";
import Api from "../../utils/API";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    book: {}
  };

  render() {
    return ([
      <Jumbotron />,
      <div className="panel panel-info">
            <div className="panel-heading"><i className="far fa-newspaper fa-fw ficon"></i>Search Parameters</div>
            <div class="panel-body">
                  <form>
                    <div class="form-group">
                        <label for="searchTerm">Search Term:</label>
                        <input type="text" className="form-control" id="searchTerm" aria-describedby="emailHelp" placeholder="search"/>
                    </div>
                    <div className="form-group">
                        <label for="numberRecords">Number of Records to Retrieve (Optional):</label>
                        <input type="number" min="0" max="10" className="form-control" id="numberOfRecords" placeholder="maximum of 10 records"/>
                    </div>
                    <div className="form-group">
                        <label for="startYear">Start Year (Optional):</label>
                        <input type="date" className="form-control" id="startYear" placeholder="YYYYMMDD"/>
                    </div>
                    <div className="form-group">
                        <label for="endYear">End Year (Optional):</label>
                        <input type="date" className="form-control" id="endYear" placeholder="YYYYMMDD"/>
                    </div>

                    <button type="submit" className="btn btn-primary searchBtn">
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
