const mongoose = require("mongoose");

const readConnection = mongoose.createConnection(
    process.env.MONGODB_URI_READ
);

const writeConnection = mongoose.createConnection(
    process.env.MONGODB_URI_WRITE
);

readConnection.on("connected", () => {
    console.log("READ MongoDB connected");
});

writeConnection.on("connected", () => {
    console.log("WRITE MongoDB connected");
});

readConnection.on("error", (error) => {
    console.error("READ MongoDB error:", error);
});

writeConnection.on("error", (error) => {
    console.error("WRITE MongoDB error:", error);
});

module.exports = {
    readConnection,
    writeConnection
};