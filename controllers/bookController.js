const {
    readConnection,
    writeConnection
} = require("../config/database");

const {
    createReadModel,
    createWriteModel
} = require("../models/bookModel");

const ReadBook =
    createReadModel(readConnection);

const WriteBook =
    createWriteModel(writeConnection);


// ==========================
// GET BOOKS
// READ USER
// ==========================

const getBooks = async (req, res) => {

    try {

        const books =
            await ReadBook
                .find()
                .lean();

        res.render("books", {
            books
        });

    } catch (error) {

        console.error(error);

        res.status(500)
            .send("Cannot load books");
    }
};


// ==========================
// ADD BOOK
// WRITE USER
// ==========================

const addBook = async (req, res) => {

    try {

        const {
            productCode,
            name,
            price
        } = req.body;


        // =====================
        // CHECK MSSV PREFIX
        // =====================

        const mssv =
            process.env.MSSV;

        const prefix =
            mssv.slice(-3);


        if (!productCode.startsWith(prefix)) {

            return res
                .status(400)
                .send(
                    `Mã sản phẩm phải bắt đầu bằng ${prefix}`
                );
        }


        // =====================
        // CALCULATE VAT
        // =====================

        const lastDigit =
            Number(
                mssv[mssv.length - 1]
            );

        const vat =
            lastDigit + 5;


        // =====================
        // CALCULATE PRICE
        // =====================

        const priceAfterTax =
            Number(price) *
            (1 + vat / 100);


        // =====================
        // WRITE DATABASE
        // =====================

        await WriteBook.create({

            productCode,

            name,

            price,

            priceAfterTax,

            vat

        });


        res.redirect("/books");

    } catch (error) {

        console.error(error);

        res.status(500)
            .send("Cannot add book");
    }
};


module.exports = {
    getBooks,
    addBook
};