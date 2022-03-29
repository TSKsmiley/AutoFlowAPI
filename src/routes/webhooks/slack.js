import 'dotenv/config';
import express from "express";

const platformID = "slack";

//Test values
let testxoxbToken = process.env.XOXB_TOKEN_SLACK;
let testChannelID = "C037WSEAHRR";

const Router = express.Router();

Router.post('/', async function (req, res) {
    console.log("Test1");
    res.status(200).send({"challenge": `${req.body.challenge}`});
})


Router.get('/', async function (req, res) {
    // Find conversation ID using the conversations.list method
    async function findConversation(name) {
        try {
        // Call the conversations.list method using the built-in WebClient
            const result = await app.client.conversations.list({
                // The token you used to initialize your app
                token: testxoxbToken
            });
    
            for (const channel of result.channels) {
                if (channel.name === name) {
                conversationId = channel.id;
        
                // Print result
                console.log("Found conversation ID: " + conversationId);
                // Break from for loop
                break;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    
    // Find conversation with a specified channel `name`
    findConversation("tester-channel");
    

    // Store conversation history
    let conversationHistory;
    // ID of channel you watch to fetch the history for
    let channelId = testChannelID;

    try {
    // Call the conversations.history method using WebClient
        const result = await client.conversations.history({
        channel: channelId
    });

    conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory.length + " messages found in " + channelId);
    }
        catch (error) {
        console.error(error);
    }


    // Store message
    let message;

    // Fetch conversation history using the ID and a TS from the last example
    async function fetchMessage(id, ts) {
        try {
            // Call the conversations.history method using the built-in WebClient
            const result = await app.client.conversations.history({
            // The token you used to initialize your app
            token: testxoxbToken,
            channel: id,
            // In a more realistic app, you may store ts data in a db
            latest: ts,
            // Limit results
            inclusive: true,
            limit: 1
            });

            // There should only be one result (stored in the zeroth index)
            message = result.messages[0];
            // Print message text
            console.log(message.text);
        }
        catch (error) {
            console.error(error);
        }
    }
    
    // Fetch message using a channel ID and message TS
    fetchMessage(testChannelID, result.message.ts); 

    res.status(200).send('ok');
})

export const slackAPI = Router;
