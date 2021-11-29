const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est error aperiam voluptatibus reiciendis atque enim aspernatur iusto nostrum totam, pariatur voluptas consequuntur quis cumque, ipsa maiores. Id laudantium blanditiis consectetur.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fuga facilis accusantium, sed sunt provident sapiente fugiat optio magni officiis, voluptate mollitia animi et ratione repellendus repellat, at autem quas!";
const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore velit quis laborum adipisci animi natus fuga molestias ratione sit nulla minus officia pariatur similique ex, mollitia et facere laudantium est.";



app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("home.ejs", {
        homeStartingContent: homeStartingContent
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

app.post("/compose", function (req, res) {
    console.log(req.body.postTitle);
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
})