var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/create-info",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var contactMessage = req.body.contactMessage;

    var data = {
        "name": name,
        "email" : email,
        "contactMessage": contactMessage
    }

    db.collection('messages').insertOne(data, (err, collection)=>{
        if(err){
            throw err;
        }
        console.log("Message delivered successfully");
    });

    return res.redirect('message-success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(4000);


console.log("Listening on PORT 4000");