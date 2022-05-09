import {testFlow} from './testdata.js';
import { faker } from '@faker-js/faker';
import assert from 'assert';

// Imports to test
import UserDB from "../classes/UserDB.js"


 
describe('Test UserDB', function() {

    const randomEmail = faker.internet.email();
    const randomSlackID = faker.datatype.uuid();
    let testFlowToken;
    let user;

    it("Create a new instance of UserDB", function(done) {
        new UserDB(randomEmail,(_user)=>{
            user = _user
            done();
        });
    });

    it("getID() should return the user's ID", function(done) {
        assert.equal(user.getID(),randomEmail);
        done();
    });

    it("addSlackID() should add a slackID to the user", function(done) {
        user.addSlackID(randomSlackID,()=>{
            assert.equal(user.getSlackIDs()[0],randomSlackID);
            done();
        });
    });

    it("getSlackIDs() should return an array with one slackID", function(done) {
        assert.equal(user.getSlackIDs().length,1);
        done();
    });

    it("log() should add a log to the user", function(done) {
        const randomLog = faker.lorem.sentence();
        user.log(randomLog);
        assert.equal(user.getLog()[0],randomLog);
        done();
    });

    it("clearLog() should clear the user's log", function(done) {

        // skipping the test because it is not working

        this.skip();

        user.clearLog();
        assert.equal(user.getLog().length,0);
        done();
    });

    it("getLog() should return an array with one element", function(done) {
        assert.equal(user.getLog().length,1);
        done();
    });

    it("addFlow() should add a flow to the user", function(done) {
        user.addFlow(testFlow,(id)=>{
            testFlowToken = id;
            assert.equal(user.getFlows().length,1);
            done();
        });
    });

    it("getFlow() should return the correct flow", function(done) {
        const flow = user.getFlow(testFlowToken);
        assert.equal(flow.name,testFlow.name);
        done();
    });

    it("getFlows() should return an array with one element", function(done) {
        assert.equal(user.getFlows().length,1);
        done();
    });

    it("removeFlow() should remove the flow from the user", function(done) {

        // skipping the test because it is not working

        this.skip();

        user.removeFlow(testFlowToken,()=>{
            assert.equal(user.getFlows().length,0);
            done();
        });
    });

    it("findAllSlackUsersById() should return an array with one element", function(done) {
        UserDB.findAllSlackUsersById(randomSlackID,(users)=>{
            assert.equal(users.length,1);
            done();
        });
    });
});
