import express from "express";
import bodyParser from "body-parser";
import passportSlack from "passport-slack-oauth2";
import passport from "passport";

const SlackStrategy = passportSlack.Strategy
const app = express();

passport.use(new SlackStrategy({
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // optionally persist profile data
    console.log(profile);
    done(null, profile);
  }
));

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));

// path to start the OAuth flow
app.get('/slack', passport.authorize('slack'));

// OAuth callback url
app.get('/slack/callback', 
  passport.authorize('slack', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

export const OAuthApp = app;
