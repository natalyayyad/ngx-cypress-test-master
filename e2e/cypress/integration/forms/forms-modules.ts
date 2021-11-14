/// <reference types="cypress" />

export class Forms {

    getCard(header: string){
        return cy.get('nb-card-header').contains(header).parent()
    }

    getElementByPlaceHolder(placeholder: string){
        
    }
}