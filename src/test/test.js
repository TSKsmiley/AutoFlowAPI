
// import database requrements 
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


// Create a new memmory database for testing
const mongo = await MongoMemoryServer.create();
const uri = mongo.getUri();

before(function(done) {
    mongoose.connect(uri, { useNewUrlParser: true }).then(async function () {
        done();
    })
});
 
import('UserDB.js');
import('TokenDB.js');


after(function(done) {
    mongoose.disconnect().then(done());
});
