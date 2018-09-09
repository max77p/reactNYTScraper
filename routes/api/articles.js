const router=require("express").Router();
const articleController=require("../../controllers/articleController");

router.route("/home").get(articleController.findAll);

module.exports=router;