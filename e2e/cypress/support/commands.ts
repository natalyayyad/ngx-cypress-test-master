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
Cypress.Commands.add('signin', (email, password) => {
    cy.get('[type=Email]').type(email)
    cy.get('[type=Password]').type(password)
})

Cypress.Commands.add('clickButton', (status?) => {
    if (status) {
        cy.get(`button[type=submit][status=${status}]`).click()
    } else {
        cy.get(`button[type=submit]`).click()
    }

})

Cypress.Commands.add('checkBox', () => {
    cy.get('[type=checkbox]').check()
})
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
