
import { faker } from '@faker-js/faker';
import assert from 'assert';

// Imports to test
import TokenDB from "../classes/TokenDB.js";


 
describe('Test TokenDB',  function() {

    const randomEmail = faker.internet.email("Peter");
    let testToken;

    it('genrateToken() should generate a new token and store it in the database', async function() {
        
        testToken = await TokenDB.genrateToken(randomEmail);

        assert.equal(testToken.length,36);
    });

    it('getUser() should return the user object', function() {
        TokenDB.getUser(randomEmail,(user)=>{
            assert.equal(user.getID(),randomEmail);
        });
    });

    it('getUserID() should return the userID', function() {
        TokenDB.getUserID(testToken,(userID)=>{
            assert.equal(userID,randomEmail);
        });
    });

    it('getFlow() should return the flow object', function() {

        // this function is skipped cause there isnt actually any flow to get

        this.skip();
    });
    
    it('deleteToken() should delete the token', function() {
        TokenDB.deleteToken(testToken,()=>{
            TokenDB.getUserID(testToken,(userID)=>{
                assert.equal(userID,null);
            });
        });
    });
    

});

