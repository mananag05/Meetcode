const mongoose = require('mongoose');

async function connectmongodb (url){
    
    return mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB') )
    .catch(error => {
      console.error('Error:', error);
    });

}

module.exports = {connectmongodb,}