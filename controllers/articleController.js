const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" +
      "&q=" +
      search;
    event.preventDefault();

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }
};
