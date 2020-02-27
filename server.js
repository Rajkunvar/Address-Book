var express = require('express');
var mongodb = require('mongodb');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var MongoClient = require('mongodb').MongoClient;

var db;

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

MongoClient.connect("mongodb+srv://Anagha:10ckme987@mongocluster-pqjmx.mongodb.net/UserData?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, database) {
   if (err) throw err;
   db = database;
   app.listen(4000);
   console.log("Server is booted at 4000");
});

app.get('/contacts', (request, response) => {
   let dbObj = db.db("UserData");
   dbObj.collection("Contacts").find({}).toArray(function (error, documents) {
      if (error) {
         console.log("##Exception occured in GET:", error);
         response.status(500).send('Something broke!');
      };
      response.send(documents);
   });
})

app.post('/contacts', (request, response) => {
   let firstname = request.body.firstname;
   let lastname = request.body.lastname;
   let email = request.body.email;
   let mobile = request.body.mobile;
   let isfavorite = request.body.isfavorite;

   let dbObj = db.db("UserData");
   dbObj.collection("Contacts").insertOne(
      { firstname: firstname, lastname: lastname, email: email, mobile: mobile, isfavorite: isfavorite },
      {},
      function (error, row) {
         if (error) {
            console.log("##Exception occured in POST:", error);
            response.status(500).send('Insert failed');
         }
         response.send("200");
      }
   );
});

app.get('/contacts/:id', (request, response) => {
   let id = request.params.id;
   let dbObj = db.db("UserData");
   dbObj.collection("Contacts").find({ firstname: id }).toArray(function (error, documents) {
      if (error) {
         console.log("##Exception occured in GET By Id:", error);
         response.status(500).send('Insert Get by id failed');
      };
      response.send(documents);
   });
})

app.put('/contacts/:id', (request, response) => {
   let id = request.params.id;
   let queryParams = id.split("||");
   let firstname = request.body.firstname;
   let lastname = request.body.lastname;
   let email = request.body.email;
   let mobile = request.body.mobile;
   let isfavorite = request.body.isfavorite;
   
   let dbObj = db.db("UserData");
   dbObj.collection("Contacts").updateMany(
      { firstname: queryParams[0],lastname: queryParams[1]},
      { $set: { firstname: firstname, lastname: lastname, email: email, mobile: mobile, isfavorite: isfavorite } },
      {},
      function (error, object) {
         if (error) {
            console.log("##Exception occured in PUT:", error);
            response.status(500).send('Update failed');
         }         
         response.send("200");
      }
   );
});

app.delete("/contacts/:id", (request, response) => {
   let id = request.params.id;
   let queryParams = id.split("||");
   let deleteQuey = { firstname: queryParams[0],lastname: queryParams[1]};
   let dbObj = db.db("UserData");
   dbObj.collection("Contacts").deleteMany(deleteQuey, function (err, obj) {
      if (err) {
         console.log("##Exception occured in DELETE:", error);
         response.status(500).send('Delete failed');
      }
      response.send("200");
   });
});



