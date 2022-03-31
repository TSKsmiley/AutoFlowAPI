/**
 * Document containing an object with information on the capabilities of the API
 */

export const flowInfo = {
    /**
     * List containing information on the different routes
     */
    routes: [{
        name: "Slack",
        route: "api.aau-sw.dk/actions/slack"
    }, {
        name: "GitHub",
        route: "api.aau-sw.dk/actions/slack",
    }],

    /**
     * List containing the possible actions, its required and optional options and content.
     * It also contains information on which actions are possible under excution. 
     */
    actions: [{
        name: "Discord",
        options: {
            requiredFields: ["Webhook URL"],
            optionalFields: ["Default Username", "Default Avatar IMG(URL)"],
        },
        content:{
            requiredFields: ["Action", "Content"],
            optionalFields: ["Username", "Avatar IMG(URL)"],
        },
        executeAction: ["sendMessage", "embedMessage"]
    }, {
        name: "Mail",
        options: {
            requiredFields: ["Default User Email", "Default Mail Subject", "Default Mail Content"],
        },
        content: {
            requiredFields: ["Action"],
            optionalFields: ["User Email", "Mail Subject", "Mail Content"]
        },
        executeAction: ["sendMail"],
    }, {
        name: "Slack",
        options: {
            requiredFields: ["Default Channel ID", "Default Message"]
        },
        content: {
            requiredFields: ["Action"],
            optionalFields: ["Channel ID", "Message"]
        },
        executeAction: ["slackMessage"],
    }]
};
