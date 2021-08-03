const dialogflow = require('@google-cloud/dialogflow');

require("dotenv").config();

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  const sessionClient = new dialogflow.SessionsClient({
    credentials: {
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL
    }
  });

  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

const executeQueries = async (queries, projectId, sessionId, languageCode) => {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let context;
  let intentResponse;
  let queryRes = []
  for (const query of queries) {
    try {
      let singleQueryRes = []
      singleQueryRes.push(query)
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      singleQueryRes.push(intentResponse.queryResult.fulfillmentText)
      queryRes.push(singleQueryRes)
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
    } catch (error) {
      console.log(error);
    }
  }
  return queryRes
}

module.exports = executeQueries