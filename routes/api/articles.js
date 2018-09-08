const router=require("express").Router();
const articleController=require("../../controllers/articleController");

router.route("/:id").get(articleController.findAll);

module.exports=router;