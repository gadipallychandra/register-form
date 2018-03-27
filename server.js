const express = require('express');
const path = require('path');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongodb = require('./config.js');

const app = express();
const port = process.env.port || 4000;
const srcpath = path.join(__dirname, '/public');
app.use(express.static('public'));
app.use(bodyParser.json(
    {
        limit: '5mb'
    }
));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema ({
    name: { type: String},
    address: {type: String},
    email: {type: String},
    contact: {type: String},
}, {versionKey: false});

const model = mongoose.model('student', studentSchema, 'student');

//api for get data from database
app.get('/api/getdata', function(req, res) {
    model.find({}, function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//api for Delete data from database  
app.post("/api/Removedata",function(req,res){   
    model.remove({ _id: req.body.id }, function(err) {  
               if(err){  
                   res.send(err);  
               }  
               else{    
                      res.send({data:"Record has been Deleted..!!"});             
                  }  
           });  
   })  
     
     
   //api for Update data from database  
   app.post("/api/Updatedata",function(req,res){   
    model.findByIdAndUpdate(req.body.id, { name:  req.body.name, address: req.body.address, contact: req.body.contact,email:req.body.email },   
   function(err) {  
    if (err) {  
    res.send(err);  
    return;  
    }  
    res.send({data:"Record has been Updated..!!"});  
    });  
   })    
     
     
   //api for Insert data from database  
   app.post("/api/savedata",function(req,res){   
          
       var mod = new model(req.body);  
           mod.save(function(err,data){  
               if(err){  
                   res.send(err);                
               }  
               else{        
                    res.send({data:"Record has been Inserted..!!"});  
               }  
           });  
   });

   
// call by default index.html page
app.get("*", function(req, res) {
    res.sendFile(srcpath + '/index.html');
})


 app.listen(port, function() {
     console.log("Server started on port " + port);
});