const express = require("express");
const bookData = require("../data/bookes");
const router = express.Router();
var xss = require("xss");

router.get("/add", async (req, res) => {
    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }
	var data = { 
        title: "Add New book",
    user: req.session.user };
    res.render("addbook", data);
});

router.get("/all", async (req, res) => {
	try {
        let user = req.session.user;

        if(!user || !(/^admin\d*$/.test(user.username))){
            res.redirect("/see_menu");
            return;
        }
        bookes = await bookData.getAllbookes();
        var data = {
            title: "book List",
            bookes: bookes,
            user: req.session.user             
        }
    } catch (error) {
        throw `${error}`;
    }
	res.render("bookesList", data);
});

router.post("/", async (req, res) => {
    name = xss(req.body.name);
    version = xss(req.body.version);
    category = xss(req.body.category);
    price = xss(req.body.price);
    description = xss(req.body.description);

    let success = false;
    try {
        success = await bookData.addNewbook(name, version, category, price, description);
    } catch (error) {
        throw `${error}`;
    }

    if (success) {
        let data = {
            title : "Add New book",
            info : "Successfully add a book."
        };
        res.render("addbook", data);
    } else {
        let data = {
            title : "Add New book",
            info : "Failed to add a new book."
        }
        res.render("addbook", data);
    }

});

router.get("/:id", async (req, res) => {
    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }

    let id = xss(req.params.id);

    try {

        const book = await bookData.getbookById(id);
        var data = { 
            title : "book Detail",
            book : book,
            user: req.session.user
         };
    } catch (error) {
        throw `${error}`;
    }
    res.render("bookDetail", data);
});

router.post("/delete", async (req, res) => {
    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }


    let id = xss(req.body.bookid);
    let success = false;
    try {
        success = await  bookData.deletebookById(id);
        res.redirect("/book/all");
    } catch (error) {
        throw `${error}`;
    }
});

router.post("/modify", async (req, res) => {

    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }

    let id = xss(req.body.bookid);
    let name = xss(req.body.bookname);
    let version = xss(req.body.version);
    let category = xss(req.body.bookcategory);
    let price = xss(req.body.bookprice);
    let description = xss(req.body.bookdescription);

    var data = {
        title : "book Modify",
        id : id,
        name : name,
        version : version,
        category : category,
        price : price,
        description : description,
        user:req.session.user
    };
    res.render("bookModify", data);
});

router.post("/modify/:id", async (req, res) => {

    let user = req.session.user;

    if(!user || !(/^admin\d*$/.test(user.username))){
        res.redirect("/see_menu");
        return;
    }

    let id = xss(req.params.id);
    let name = xss(req.body.name);
    let version = xss(req.body.version);
    let category = xss(req.body.category);
    let price = xss(req.body.price);
    let description = xss(req.body.description);

    let success = false;
    const updatebook = {
        id : id,
        name : name,
        version : version,
        category : category,
        price : price,
        description : description
    }
    try {
        success = await bookData.updatebook(updatebook);
        let str = "/book/" + id;
        res.redirect(str);
    } catch (error) {
        throw `${error}`;
    }
});

module.exports = router;