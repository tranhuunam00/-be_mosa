const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const config = require('../config/google/key_df');
const uuid = require('uuid');
const fs = require('fs');

const dfRouter = express.Router();

const enums = require('../constants/enum');

const CREDENTIALS = JSON.parse(fs.readFileSync('key_google_df.json'));

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS['private_key'],
    client_email: CREDENTIALS['client_email'],
  },
};
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryText,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log(responses);
  const result = responses[0].queryResult;
  console.log(result);

  return {
    response: result.fulfillmentText,
  };
};

dfRouter.get('/', async (req, res) => {
  const value = await detectIntent('vi', req.query.text, 'abcd1234');
  res.json(value);
});

module.exports = dfRouter;
