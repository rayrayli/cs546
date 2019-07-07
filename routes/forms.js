const express = require("express");
const router = express.Router();
const data = require("../data/");
const bookData = data.book_lists;


router.get("/", async (req, res) => {
	try {
		const bookes = await bookData.getAllbookes();
		

		res.render("forms/index", {
			title: "Book Order",
			data: bookes,
			user: req.session.user
		});
	} catch (e) {
		res.status(404).json({ error: "No bookes in DB"});
	}
});

module.exports = router;