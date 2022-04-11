# AutoFlowAPI P2 (Dynamic integraion of APIs)
this repo contains the api that handles the flows created by the user on the website located at [TSKsmiley/AutoFlow](https://github.com/TSKsmiley/AutoFlow)

# Requirements

 - Node.js 16.x

# Installation
First clone the repo 
```bash
git clone https://github.com/TSKsmiley/AutoFlowAPI
```
then change your directory to the new folder
```bash
cd AutoFlowAPI
```
next up install the required packages
```bash
npm i
```
 next up create a  **.env** file. Fill out the following fields accordingly
```ini
DISCORD_WEBHOOK_TEST=your value here

DISCORD_WEBHOOK_ERROR=

MONGO_URL=

GOOGLE_TOKEN=

MAIL_ADRESS=

MAIL_PASSWORD=

SLACK_SIGNING_SECRET=

SLACK_TOKEN=

SLACK_CLIENT_ID=

SLACK_CLIENT_SECRET=
```

then start the api with
```bash
npm start
```

