const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const file = "Products.json";
const readFile = fs.readFileSync(file, "utf8");
let parse = JSON.parse(readFile);
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

io.on("connection", function (socket) {

    socket.on("edit", function(edit, id)
    {
        for(let i = 0; i < parse.length; i++)
        {
            if(id == parse[i]._id)
            {
                parse[i] = edit;
            }
        }
        socket.broadcast.emit("home", parse);
    })

    socket.on("add", function()
    {
        socket.broadcast.emit("home", parse);
    })

    socket.on("delete", function()
    {
        socket.broadcast.emit("home", parse);
    })
});

app.get("/products", function(req, res)
{
    res.json(parse);
})

app.post("/products/add", function(req, res)
{
    console.log("ok");
    let i = 0;

    while(i < parse.length)
    {
        i++;
    }

    req.body[0]._id = i+1;
    parse.push(req.body[0]);
    console.log(req.body)
    res.json(parse);
})


app.route("/products/:id")
    .get(function(req,res)
    {
        for(let i = 0; i < parse.length; i++)
        {
            if(req.params.id == parse[i]._id)
                res.json(parse[i]);
        }
    })
    .post(function(req,res)
    {
        for(let i = 0; i < parse.length; i++)
        {
            if(req.params.id == parse[i]._id)
            {
                parse[i] = req.body[0];
                res.json(parse[i]);
            }
        }
    })
    .delete(function(req, res)
    {
        const newParse = [];
    
        for(let i = 0; i < parse.length; i++)
        {
            if(req.params.id == parse[i]._id)
            {
                delete parse[i];
            }
        }
    
        for(let i = 0; i < parse.length; i++)
        {
            if(parse[i] != null)
            {
                newParse.push(parse[i]);
            }
        }
    
        parse = newParse;
        res.json(parse);
    });

server.listen(3001);