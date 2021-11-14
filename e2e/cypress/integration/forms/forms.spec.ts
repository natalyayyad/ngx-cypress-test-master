/// <reference types="cypress" />

import { Forms } from "./forms-modules";

let forms : Forms

describe('forms', () => {

  before( () => {
    forms = new Forms()
  })

  beforeEach(() => {
    // go to page
    cy.visit('http://localhost:64240/pages/forms/layouts')

    //pull data
    cy.fixture('example').as('data')
  })

  // verify page title
  it('verify title of the page', () => {
    cy.title().should('eq', 'ngx-admin Demo Application')
  })

  // verify inline form
  it('visit inline form', () => {
    forms.getCard('Inline form').within(() => {
      cy.get('@data').then((dummydata: any) => {
        cy.get('input')
        cy.get('input:first').should('have.attr', 'placeholder', 'Jane Doe').type(dummydata.name)
        cy.get('input').eq(1).should('have.attr', 'placeholder', 'Email').type(dummydata.email)
        cy.get('input[type=checkbox]').check({ force: true })
        cy.submit('primary')
      })
    })
    
    /*
    cy.get('.form-inline').within(() => {
      cy.get('@data').then((dummydata: any) => {
        cy.get('input:first').should('have.attr', 'placeholder', 'Jane Doe').type(dummydata.name)
        cy.get('input').eq(1).should('have.attr', 'placeholder', 'Email').type(dummydata.email)
        cy.get('input[type=checkbox]').check({ force: true })
        cy.submit('primary')
      })
    })
    */
  })

  // verify grid form
  it('visit using the grid', () => {
    cy.get('@data').then((dummydata: any) => {
      cy.get('#inputEmail1').type(dummydata.email)
      cy.get('#inputPassword2').type(dummydata.password)
    })

    cy.get('nb-radio').eq(0).click()
    cy.get('nb-radio').eq(1).click()
    cy.get('input[type=radio]').eq(2).should('be.disabled')

  })

  // verify basic form
  it('visit basic form', () => {

    cy.get('@data').then((dummydata: any) => {
      cy.get('#exampleInputEmail1').type(dummydata.email)
      cy.get('#exampleInputPassword1').type(dummydata.password)
    })
    //checkbox here
    cy.submit('danger')
  })

  // verify form without labels
  it('visit form without label', () => {
    cy.get('@data').then((dummydata: any) => {
      cy.get('.form-group').children('input').eq(0).should('have.attr', 'placeholder', 'Recipients').type(dummydata.email)
      cy.get('.form-group').children('input').eq(1).should('have.attr', 'placeholder', 'Subject').type(dummydata.subject)
      cy.get('textarea').type(dummydata.body)
    })
    cy.submit('success')
  })

  // verify block form
  it('visit block form', () => {
    cy.get('@data').then((dummydata: any) => {
      cy.get('#inputFirstName').type(dummydata.firstname)
      cy.get('#inputLastName').type(dummydata.lastname)
      cy.get('#inputEmail').type(dummydata.email)
      cy.get('#inputWebsite').type(dummydata.website)

    })
    //cy.get('.row').children('').get('button[type=submit]').should('have.attr', 'xpath=1').click()
    //cy.submit('success')
  })

  it('visit horizental form', () => {
    cy.get('@data').then((dummydata: any) => {
      cy.get('#inputEmail3').type(dummydata.email)
      cy.get('#inputPassword3').type(dummydata.password)
    })

    //check box here
    cy.submit('warning')
  })

  //get, find, contain
  // best practice for selectors
  //first fixture


})
