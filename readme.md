# Dialogflow testing example

This repository is example how we may test Dialogflow

## Testing via UI

First example how we may test Dialogflow is user interface but for first it is not that simple because of i-frames. However, I wrote such a test. It's written in cypress.

To run it use command:

npm run cypress

## Testing via api

For now this test is separate from cypress because of issues but maybe sun i will add new cypress command.

to run existing test use command:

npm run dialogflowApi

## My bot code

```
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
 
const intentList = {
  test: "test",
  welcome: "Default Welcome Intent",
  default: "Default Fallback Intent"
};
 
const app = (request, response) => {
  const agent = new WebhookClient({ request, response });
  const typedSentence = request.body.queryResult.queryText;
  let intentMap = new Map();
  
  function welcome(agent) {
    switch (typedSentence.toLowerCase()) {
       case 'cześć':
        const responsesList = [
          `no cześć, kucharek sześć`,
           `no cześć, to ja teść!`,
           `cześć, zjesz pączków sześć?`
        ];
        const pick = Math.floor( Math.random() * responsesList.length );
        
        agent.add(responsesList[pick]);
        break;
      case 'hej':
        agent.add(`hej hej, co za klej`);
        break;
      case 'witam':
        agent.add(`o zdrowie pytam!`);
        break;
    }
  }
  function fallback(agent) {
    const responsesList = [
      `I didn't understand`,
      `I'm sorry, can you try again?`
    ];
    const pick = Math.floor( Math.random() * responsesList.length );

    agent.add(responsesList[pick]);
  }
   function test (agent) {
    agent.add(`to jest test`);
  }
  
intentMap.set( intentList.test , test);
intentMap.set( intentList.welcome , welcome);
intentMap.set( intentList.default , fallback);
  
  agent.handleRequest(intentMap);
};

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
```
