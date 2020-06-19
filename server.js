const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Welcome to the Contact Keeper API"));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port: " + PORT));