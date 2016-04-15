var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
        
//APP CONFIGURATION
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static('public'));
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
    res.redirect("/blogs");
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
    Blog.create({name:req.body.name, image:req.body.image, body:req.body.body}, function(err,newBlog){
        if(err){console.log("create error")
    }else{
       res.redirect("/blogs"); 
    }
    });
});


//Show:  Show information about 1 selected blog post
app.get("/blogs/:id", function(req, res){
    // console.log(req.params.id);
    Blog.findById(req.params.id, function(err, blog){
        if(err){res.send(err);
        }else{
        res.render("show", {blog:blog}); 
        }
    });
});

//Edit:     Edit information about 1 selected blog post
//Edit:     Render edit blog form 
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){console.log("app.get(/blogs/edit/:id) error");
        }else{
        res.render("edit", {blog:blog}); 
        }
    });
});

//Submit changes & re-route to list of all blog posts
app.put("/blogs/:id", function(req, res){
        Blog.findByIdAndUpdate(req.params.id, 
        {$set:{name:req.body.name}}, 
        function(err, blog){
            if(err){
                res.send(err);
             }else{
                res.redirect("/blogs/"+blog._id); 
            }
        });
});

// app.put("/blogs/:id", function(req, res){
//     console.log('blog entry modified');
//     res.send('Change received.  Blog will be modified');
//     // Blog.findByIdAndUpdate(req.params._id)
// });

//Destroy:    Delete item and redirect to list of remaining blogs

app.delete("/blogs/:id", function(req, res){
    // res.send("Delete request received");
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err){console.log("param error");
        }else{
        res.redirect("/blogs");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Lets Blog!");
});