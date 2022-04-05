import express from "express";
import bodyParser from "body-parser";
import passportSlack from "passport-slack-oauth2";
import passport from "passport";
import UserDB from "../../classes/UserDB";

const SlackStrategy = passportSlack.Strategy
const app = express();

passport.use(new SlackStrategy({
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // optionally persist profile data
    new UserDB(profile.user.email, (user = UserDB) => {
        user.addSlackID(profile.user.id, (user = UserDB) => {done(null, profile);});
    });
  }
));

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));

// path to start the OAuth flow
app.get('/slack', passport.authorize('Slack'));

// OAuth callback url
app.get('/slack/callback', 
  passport.authorize('Slack', { failureRedirect: '/login' }),
  (req, res) => res.redirect('https://aau-sw.dk/login')
);

export const OAuthApp = app;
