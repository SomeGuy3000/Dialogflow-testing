const hostUrl =
  "https://bot.dialogflow.com/467edd1e-b14e-4392-929f-c7c8d01726b4";

const getIframeBody = () => {
  return cy
    .get("#frame")
    .should("exist")
    .its("0.contentDocument")
    .should("exist")
    .its("body")
    .should("not.be.undefined")
    .then(cy.wrap);
};

const typeAndCheckRes = (text, expectedRes) => {
  getIframeBody()
    .find("#query")
    .type(text)
    .should("have.value", text)
    .type("{enter}")
    .type(text)
    .should("have.value", text)
    .type("{enter}");
  return getIframeBody()
    .find(".server-response")
    .last()
    .should("not.have.text", "...")
    .then((data) => {
      if (expectedRes.includes(data.text())) {
        console.log(data.text());
      } else {
        throw "None of the elements match";
      }
    });
};

describe("The application loads", () => {
  it("respone on default intent", () => {
    cy.visit(hostUrl);
    let message = "any message";
    let expectedRes = ["I didn't understand", "I'm sorry, can you try again?"];
    typeAndCheckRes(message, expectedRes);
  });

  it("respone on message cześć", () => {
    cy.visit(hostUrl);
    let message = "cześć";
    let expectedRes = [
      `no cześć, kucharek sześć`,
      `no cześć, to ja teść!`,
      `cześć, zjesz pączków sześć?`,
    ];
    typeAndCheckRes(message, expectedRes);
  });

  it("respone on message hej", () => {
    cy.visit(hostUrl);
    let message = "hej";
    let expectedRes = [`hej hej, co za klej`];
    typeAndCheckRes(message, expectedRes);
  });

  it("respone on message witam", () => {
    cy.visit(hostUrl);
    let message = "witam";
    let expectedRes = [`o zdrowie pytam!`];
    typeAndCheckRes(message, expectedRes);
  });
});
