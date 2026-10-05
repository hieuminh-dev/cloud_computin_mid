const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        productCode: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        priceAfterTax: {
            type: Number,
            required: true
        },

        vat: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

function createReadModel(connection) {
    return connection.model(
        "Book",
        bookSchema,
        "books"
    );
}

function createWriteModel(connection) {
    return connection.model(
        "Book",
        bookSchema,
        "books"
    );
}

module.exports = {
    createReadModel,
    createWriteModel
};