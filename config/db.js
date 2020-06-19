const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectToDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("MongoDB connected... \n");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectToDB;