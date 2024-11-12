const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Message = require("./models/messages.js");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

main().then(() => {
    console.log("Connected Successfully!");
}).catch((err) => {
    console.log("Error Occured ON index.js!");
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Message.insertMany([
//     { to: "Alice", msg: "Don't forget about the meeting tomorrow!", msgType: "recieved", created_at: new Date() },
//     { to: "Bob", msg: "Hey! Are you free this weekend?", msgType: "recieved", created_at: new Date() },
//     { to: "Eve", msg: "Can you send me the notes from yesterday's class?", msgType: "recieved", created_at: new Date() },
//     { to: "Charlie", msg: "Lunch at 1 PM?", msgType: "recieved", created_at: new Date() },
//     { to: "Zara", msg: "Happy Birthday! 🎉 Hope you have an amazing day!", msgType: "recieved", created_at: new Date() }
// ]).then((res) => {
//     console.log(res);
// })

app.get("/", (req, res) => {
    res.send("Welcome to the Root Page!");
})

app.get("/chats", async (req, res) => {
    let chats = await Message.find();
    let name = chats[0].to;
    let messages = await Message.find({to: name});
    res.render("homepage.ejs", {name, chats, messages});
})

app.get("/chats/message", async (req, res) => {
    let name = req.query.user_name;
    let chats = await Message.find();
    let messages = await Message.find({to: name});
    res.render("newMessage.ejs", {name, chats, messages});
})

app.get("/chats/api", async (req, res) => {
    try {
        const users = await Message.distinct("to");
        res.json(users);
    } catch (err) {
        console.log("Error was ", err);
    }
})

app.get("/chats/message/edit", async (req, res) => {
    let msgId = req.query.id;
    let name = req.query.name;
    console.log("Name is: ", name);
    let chats = await Message.find();
    let editChat = await Message.findById(msgId);
    console.log(editChat);

    let messages = await Message.find({to: name});
    res.render("chatMessage.ejs", {editChat, chats, messages, name});
})

app.put("/chats/edit/:id/:name", async (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    let {msg} = req.body;
    console.log(msg);
    let updatedMsg = await Message.findByIdAndUpdate(id, {msg}, {runValidators: true, new: true});
    console.log(updatedMsg);
    res.redirect(`/chats/message?user_name=${name}`);
})

app.delete("/chats/delete/:id/:name", async (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    console.log("Name is: ", name);
    await Message.findByIdAndDelete(id);
    res.redirect(`/chats/message?user_name=${name}`);
})

app.post("/chats/new/:name", async (req, res) => {
    let { msg  } = req.body;
    let to = req.params.name;
    let newChat = new Message({
        to : to,
        msg : msg,
        msgType : "sent",
        created_at: new Date()
    })
    newChat.save().then((res) => {
        console.log(res);
    })
    console.log(`Dheeraj send the message ${msg}, to ${to}`);
    res.redirect(`/chats/message?user_name=${to}`);
})

app.listen(8080, () => {
    console.log("App is listening!");
})
