// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("addAndLogin", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3003/api/testing/user", {
    username,
    name,
    password,
  })
    .then(() => {
      cy.request("POST", "http://localhost:3003/api/testing/login", {
        username,
        password,
      });
    })
    .then((response) => {
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
});

Cypress.Commands.add("addUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3003/api/testing/user", {
    username,
    name,
    password,
  });
  cy.visit("http://localhost:3000");
});
