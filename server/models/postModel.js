const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema(
    {
        visitPeriod: {
            type: String,
        },
        recommend: {
            type: String,
        },
        suggestions: {
            type: String,
        },
        followup: {
            type: String
        },
        food:{
            type: Number
        },
        service:{
            type: Number
        },
        experience:{
            type: Number
        },
    },
    
);

const Post = model("Post", postSchema);

module.exports = Post;