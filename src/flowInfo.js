/**
 * Document containing an object with information on the capabilities of the API
 */

export const flowInfo = {
    /**
     * List containing information on the different routes
     */
    routes: [{
        platform: "Slack",
        platformActions: [],
        route: "api.aau-sw.dk/actions/slack"
    }, {
        platform: "GitHub",
        platformActions: [],
        route: "api.aau-sw.dk/actions/slack",
    }],

    /**
     * List containing the possible actions, its required and optional options and content.
     * It also contains information on which actions are possible under excution. 
     */
    actions: [{
        name: "Discord",
        executeAction: ["sendMessage", "embedMessage"],
        content:{
            requiredFields: ["Content"],
            optionalFields: ["Username", "Avatar IMG(URL)"],
        },
        options: {
            requiredFields: ["Webhook URL"],
            optionalFields: ["Default Username", "Default Avatar IMG(URL)"],
        },
    }, {
        name: "Mail",
        executeAction: ["sendMail"],
        content: {
            optionalFields: ["User Email", "Mail Subject", "Mail Content"]
        },
        options: {
            requiredFields: ["Default User Email", "Default Mail Subject", "Default Mail Content"],
        },
    }, {
        name: "Slack",
        executeAction: ["slackMessage"],
        content: {
            optionalFields: ["Channel ID", "Message"]
        },
        options: {
            requiredFields: ["Default Channel ID", "Default Message"]
        },
    }]
};
