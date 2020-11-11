const express = require("express");
const app=express();
app.use(express.static("images"));
app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/Home.html");
});
app.get("/About.html",(req, res)=>{
    res.sendFile(__dirname + "/About.html");
});
app.get("/View.html",(req, res)=>{
    res.sendFile(__dirname + "/View.html");
});
app.get("/contact.html",(req, res)=>{
    res.sendFile(__dirname + "/contact.html");
});
app.get("/EventOrganizer.html",(req, res)=>{
    res.sendFile(__dirname + "/EventOrganizer.html");
});

app.get("/organizer_CRED.html",(req, res)=>{
    res.sendFile(__dirname + "/organizer_CRED.html");
});
app.get("/user.html",(req, res)=>{
    res.sendFile(__dirname + "/user.html");
});
app.listen(3333,()=>{
    console.log("Client App running at 3333");
});
