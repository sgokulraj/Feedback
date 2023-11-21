const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Post = require("./models/postModel.js");



dotenv.config();
const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.post("/feedback", async (req, res) => {
    try {
        console.log(req.body)
        const { visitPeriod,
            recommend,
            suggestions,
            followup,
            food,
            service,
            experience } = req.body;

        const userDetails = await Post.create({
            visitPeriod,
            recommend,
            suggestions,
            followup,
            food,
            service,
            experience
        });
        res.status(201).json("ok");
    } catch (err) {
        res.status(400).json(err);
    }
});


app.get("/getfeedback", async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
})


mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, console.log(`Server is running in 5000  `))
    )
    .catch((err) => console.log(err));
