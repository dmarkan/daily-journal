const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose = require("mongoose");
const res = require("express/lib/response");

const app = express();

mongoose.connect("mongodb+srv://darko:darmar1986@cluster0.62x42.mongodb.net/blogDB?retryWrites=true&w=majority", function(err) {
    // If no error, successfully connected
  });

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est error aperiam voluptatibus reiciendis atque enim aspernatur iusto nostrum totam, pariatur voluptas consequuntur quis cumque, ipsa maiores. Id laudantium blanditiis consectetur.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fuga facilis accusantium, sed sunt provident sapiente fugiat optio magni officiis, voluptate mollitia animi et ratione repellendus repellat, at autem quas!";
const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore velit quis laborum adipisci animi natus fuga molestias ratione sit nulla minus officia pariatur similique ex, mollitia et facere laudantium est.";

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    Post.find({}, function (err, posts) {
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });
    });
})

app.get("/about", function (req, res) {
    res.render("about.ejs", {
        aboutContent: aboutContent
    });
})

app.get("/contact", function (req, res) {
    res.render("contact.ejs", {
        contactContent: contactContent
    });
})

app.get("/compose", function (req, res) {
    res.render("compose.ejs")
})

app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({_id:requestedPostId}, function (err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
       

});

app.post("/compose", function (req, res) {
    const post = new Post ({
        title: req.body.postTitle,
        content: req.body.postBody
    })
   post.save(function (err) {
       if (err) {
           console.log(err);
       } else {
           res.redirect("/");
       }
   });
   res.redirect("/");
});




app.listen(3000, function () {
    console.log("Server started on port 3000");
})