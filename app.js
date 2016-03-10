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

// Blog.create({
//     name:"Surfing is pure joy",
//     image: "https://farm2.staticflickr.com/1082/902431113_59b429911e.jpg",
//     body: "Catch a wave and your are sitting on top of the world"
// });



app.get("/", function(req, res){
    res.send("Welcome to the blogging app");
    //res.render("home");
});

//RESTful ROUTES

//INDEX: List all blogs
app.get("/blogs", function(req, res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log("Error");
        }else{
            res.render("index", {blogs:blogs});
        }
    });
});

//New: Show new blog form 
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//Create: Create new blog post and redirect to index of all blog posts
app.post("/blogs", function(req, res){
    console.log("new blog created");
    res.redirect("/blogs");
});

//Show:  Show information about 1 selected blog post
//New: Show new blog form 
app.get("/blogs/:id", function(req, res){
    // console.log(req.params.id);
    Blog.findById(req.params.id, function(err, blog){
        if(err){console.log("param error");
        }else{
        res.render("show", {blog:blog}); 
        }
    });
    
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Lets Blog!");
});