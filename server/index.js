const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const morgan = require('morgan');
const Joi = require('@hapi/joi');

const CONNECTION_URL = "mongodb+srv://arpine:852654456AAmp@test-4euae.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "test";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

let database,collection;

const games = [{
    id: 1,
    title: 'Mario'
},
    {
        id: 2,
        title: 'Zelda'
    },
    {
        id: 3,
        title: 'Donkey Kong'
    }
];


app.get('/table', (request, response) => {
    tablesCollection && tablesCollection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
    });


app.get("/games/:title", (request, response) => {
    collection.findOne({ "title": request.params.title }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// app.put('/api/games/:id', (req, res) => {
//     const game = games.find(el => el.id === parseInt(req.params.id));
//     if (!game){
//         return res.status(404).send('Not Found');
//     }
//     const schema = {
//         title: Joi.string().min(3).required()
//     };
//     const result = Joi.validate(req.body,schema);
//     if(result.error){
//         res.status(404).send(result.error)
//     }
//     game.title = req.body.title;
//     res.send(game);
// });
// app.get('/people', (request, response) => {
//     collection.find({}).toArray((error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });

app.post('/table', (request, response) => {
    tablesCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(request.body);
    });
});



const port = process.env.PORT || 2000;
app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        tablesCollection = database.collection("table");

        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});