const path = require("path");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

require("dotenv").config({ path: ".env" });

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//app.use("/api/", require("./routes/"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "../", "client", "build", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server started in ${process.env.NODE_ENV} on port ${port}`)
);
