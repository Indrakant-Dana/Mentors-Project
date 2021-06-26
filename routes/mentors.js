const findmentor=require('express').Router();
const searchByDomain=require("../controller/mentor");

findmentor.route("/findmentor/:domain").get(searchByDomain)