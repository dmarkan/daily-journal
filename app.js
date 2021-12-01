const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const app = express();
const posts = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est error aperiam voluptatibus reiciendis atque enim aspernatur iusto nostrum totam, pariatur voluptas consequuntur quis cumque, ipsa maiores. Id laudantium blanditiis consectetur.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fuga facilis accusantium, sed sunt provident sapiente fugiat optio magni officiis, voluptate mollitia animi et ratione repellendus repellat, at autem quas!";
const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore velit quis laborum adipisci animi natus fuga molestias ratione sit nulla minus officia pariatur similique ex, mollitia et facere laudantium est.";

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("home.ejs", {
        homeStartingContent: homeStartingContent,
        posts: posts
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

app.get("/posts/:post", function (req, res) {
    const requestedTitle = req.params.post;
    posts.forEach(post => {
        const storedTitle = post.title;
        if (requestedTitle.toLower === storedTitle.toLower) { //za toLower koristimo lodash
            res.render("post.ejs", {
                title: post.title,
                content: post.content
            })
        }
    });
})

app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }
   posts.push(post);
   res.redirect("/");
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
})