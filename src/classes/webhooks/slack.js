import Action from '../action.js';
import axios from 'axios';
import { Webclient } from '@slack/events-api'

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const web = new WebClient(process.env.SLACK_TOKEN);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C037WSEAHRR';

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Star Wars r fed' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();

