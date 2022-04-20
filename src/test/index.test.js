import assert from 'assert';
import mongoose from 'mongoose';

// Imports to test

import UserDB from "../classes/UserDB.js"

// Importing the environment file (.env)
import 'dotenv/config';

let testFlowToken = "";
const testFlow = {
    routes:[{
        platform: "GitHub",
        platformActions: [],
    }],
    actions: [{
        name: "Discord",
            executeAction: ["sendMessage"],
            content:{
                requiredFields: ["This is a test"],
                optionalFields: ["UsernameTest", "https://i.imgflip.com/1tecgr.jpg"],
            },
            options: {
                requiredFields: [process.env.DISCORD_WEBHOOK_TEST],
            },
    }]
};

/**
 * Test for the UserDB class and its functions
 */

describe('UserDB test', function () {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
        describe('Retrieveing userid', function () {
            it('Should return the userid of the user', function () {
                new UserDB("testUser", (user) => {
                    assert.equal(user.getID(), "testUser");
                });
            });
        });
        describe('Adding and getting flows', function () {
            it('Should retrieve a list of flows', function (done) {
                new UserDB("testUser", (user) => {
                    user.addFlow(testFlow, (token) => {
                        testFlowToken = token;
                        assert.equal(user.getFlow(testFlowToken), testFlow);
                    });
                });
            });
        });
    });
    mongoose.connection.close();
});




