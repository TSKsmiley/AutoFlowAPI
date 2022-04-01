import assert from 'assert'

// Imports to test
import UserDB from "../classes/UserDB"

// Importing the environment file (.env)
import 'dotenv/config';

//hey
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
        assert.equal(0,0);
        });
    });
    describe('#gaming()', function () {
        it('gaming', function () {
        assert.equal(0,0);
        });
    });
});

/**
 * Test for the UserDB class and its functions
 */
 describe('UserDB test', function () {
    describe('Retrieveing userid', function () {
        it('SHould return the userid of the user', function () {
            new UserDB("testUser", (user) => {
                assert.equal(user.getID(), "testUse");
            });
        });
    });
    describe('Getting flows', function () {
        it('gaming', function () {
        assert.equal(0,0);
        });
    });
});


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
                requiredFields: [DISCORD_WEBHOOK_TEST],
            },
    }]
}
