var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");
        
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var blogSchema = new mongoose.Schema({
    name:String,
    image: String,
    body: String,
    date: {type:Date, default: Date.now()}
});

//MONGOOSE MODEL CONFIG
var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.send("Welcome to the blogging app");
    //res.render("home");
});

//RESTful ROUTES

//INDEX: List all blogs
app.get("/blogs", function(req, res){
    res.send("Here is a list of all the blogs");
    //res.render("index");
});

//New: Show new blog form 
app.get("/blogs/new", function(req, res){
    // res.send("show form for creating new blog post");
    res.render("new");
});

//Create: Create new blog post and redirect to index of all blog posts
app.post("/blogs", function(req, res){
    console.log("new blog created");
    res.redirect("/blogs");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Lets Blog!");
});