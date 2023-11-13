const express = require("express");
const router = express.Router();
const Author= require("../models/author")

//all authors
router.get("/",async(req,res)=>{
    let searchOption={};
    if(req.query.name != null && req.query.name != "" ){
        searchOption.name = new RegExp(req.query.name,"i")
    }
    try{
        const authors = await Author.find(searchOption)
        res.render("authors/index",{
            authors:authors,
            searchOption:req.query
        })
    }catch{
        res.redirect("/");
    }
})

//new authors
router.get("/new",(req,res)=>{
    res.render("authors/new",{author: new Author()})
})

//create authors
router.post("/",async (req,res)=>{
    const author= new Author({
        name:req.body.name,
    })
    try{
        const newAuthor= await author.save();
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        res.render("authors/new",{
            author:author,
            errorMessage:"error creating author"
        })
    }
})

module.exports = router;