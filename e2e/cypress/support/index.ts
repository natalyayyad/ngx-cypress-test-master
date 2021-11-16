/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
   * Type to each sign in form
   * @example
   * cy.singin()
   */
    signin(email: string, password: string): Chainable<any>


    /**
    * Reach different status of submit buttons
    * @example
    * cy.clickButton('success')
    */
    clickButton(status: string): Chainable<any>

    /**
  * Reach different check boxes
  * @example
  * cy.check()
  */
    checkBox(): Chainable<any>

  }
}
