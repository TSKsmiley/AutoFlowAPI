export const testFlow = {
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
