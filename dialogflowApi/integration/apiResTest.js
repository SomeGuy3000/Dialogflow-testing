const sendMessages = require("../intents/sendMessages");
require("dotenv").config();

module.exports = async () => {
  let queries = ["any message", "cześć", "hej", "witam"];
  let expected = [
    ["I didn't understand", "I'm sorry, can you try again?"],
    [
      `no cześć, kucharek sześć`,
      `no cześć, to ja teść!`,
      `cześć, zjesz pączków sześć?`,
    ],
    [`hej hej, co za klej`],
    [`o zdrowie pytam!`],
  ];
  let res = await sendMessages(
    queries,
    process.env.PROJECT_ID,
    process.env.SESSION_ID,
    process.env.LANGUAGE_CODE
  );

  for (var i = 0; i < queries.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.

    if (expected[i].includes(res[i][1])) {
      console.log("Match:", res[i]);
    } else {
      console.log("None of the elements match ", res[i], expected[i]);
    }
  }
};
