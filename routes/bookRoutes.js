const express = require("express");

const router = express.Router();

const {
    getBooks,
    addBook
} = require("../controllers/bookController");


router.get(
    "/books",
    getBooks
);


router.get(
    "/books/add",
    (req, res) => {
        res.render("add-book");
    }
);


router.post(
    "/books",
    addBook
);


module.exports = router;