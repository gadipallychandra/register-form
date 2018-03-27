const mongo = require('mongoose');
//create mongodb  connection
const mongodb = mongo.connect("mongodb://localhost/reactcrud", function(err, res) {
    if(err) {
        console.log('Failed to connect to ', mongodb);
    } else {
        console.log('Conect to ' + mongodb, ' + ', res);
    }
});

module.exports = mongodb;