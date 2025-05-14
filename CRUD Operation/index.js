let express = require("express");
const app = express();
let path = require("path");
let port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "/templates"));


let posts = [
    {   
        id: uuidv4(),
        username: "Dheeraj",
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dignissimos voluptatum, doloremque.`
    },
    {   
        id: uuidv4(),
        username: "Timothy",
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dignissimos voluptatum, doloremque.`
    },
    {   
        id: uuidv4(),
        username: "Jordan",
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dignissimos voluptatum, doloremque.`
    },
    
];

app.get("/posts", (req, res) => {
    res.render('index.ejs', {posts});
})

app.get("/posts/addpost", (req, res) => {
    res.render("addpost.ejs");
})

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let newID = uuidv4();
    posts.push({id: newID, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id/editpost", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("editpost.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
})

app.listen(port, ()=> {
    console.log("App is listening on port", port);
})