import axios from "axios";

export default {
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  getArticles: function() {
    return axios.get("/api/articles");
  },
  deleteArticle:function(id){
    return axios.delete("/api/articles/"+id);
  },
  getArticle:function(id){
    return axios.get("/api/articles/"+id);
  }
};
