const express = require("express");
const connectToDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectToDB();

// Initialize middle ware to accept json response
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Welcome to the Contact Keeper API"));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV = "production") {
    // Point to static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port: " + PORT));