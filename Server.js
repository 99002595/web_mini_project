
const app = require('express')();
const parser = require("body-parser");
const cors = require('cors');
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());
let events = [];
function readData(){
    const filename = "data.json";//new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    events = JSON.parse(jsonContent);
}
function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(events);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/events", (req, res)=>{
    readData();
    res.send(JSON.stringify(events));    
});
app.get("/events/:id", (req, res)=>{
    const eventid = req.params.id;
    if(events.length == 0){
        readData();
    }
    let foundRec = events.find((e) => e.eventId == eventid);
    if(foundRec == null)
        throw "The Event not found";
    res.send(JSON.stringify(foundRec));
});
app.put("/events", (req, res)=>{
    if(events.length == 0)
        readData();//Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < events.length; index++) {
        let element = events[index];
        if (element.eventId == body.eventId) {//find the matching record
            element.eventName = body.eventName;
            saveData();
            res.send("Event is updated successfully");
        }
    }
    //update the data
    //exit the function....
});
app.post('/events', (req, res)=>{
    
    if (events.length == 0)
        readData();//Fill the array if it is not loaded...
    let body = req.body;//parsed data from the POST...
    events.push(body);  
    saveData();//updating to the JSON file...
    res.send("New Event added successfully");
});
app.delete("/events/:id", (req, res) => {
    if (events.length == 0)
        readData(); 
    //let body = req.body; 
   // var flag=1;
    const eventid = req.params.id;
    for (let index = 0; index < events.length; index++) {
        let element = events[index];
        if (element.eventId == eventid) { 
            events.splice(index,1);
            res.send("Event Deleted Successfully");
            saveData();
            readData();
           // flag = 0;
        }
     }
    // if (flag >= 1) {
      //  res.send("Error in Deleting");
   //// }

});
app.get("/events", function(req, res)
{
    nameList = [];
    data.forEach(element =>
    {
        nameList.push(element);
    });
    res.send(nameList);
});
app.get("/events", function(req, res)
{
    keyword = req.query.sTitle;
    searchEventName = [];
    data.forEach(element =>
    {
        if(keyword == element.eventName)
        {
            searchEventName.push(element) ;
        }
    });
    res.send(searchEventName);
});
app.listen(1234, ()=>{
    console.log("Server available at 1234");
});