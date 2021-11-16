/// <reference types="cypress" />
import { InputElement, checkElement } from "./forms-interfaces";

export class Forms {

    getCard(header: string) {
        return cy.get('nb-card-header').contains(header).parent()
    }

    getInputElement(elements: InputElement[]) {
        elements.forEach(element => {
            let ele = cy.get('input').eq(element.index)
            ele.type(element.text)
            // if (ele.get('input[type=email]')) {
            //     ele.then(data => {
            //         this.assertEmail(data.val() + "")
            //     })
            // }
        })
    }

    checkCheckboxElement(elements: checkElement[]) {
        elements.forEach(element => {
            let ele = cy.get('input[type=checkbox]').eq(element.index)
            ele.check({ force: true })

            if (element.disabled === false) {
                ele.should('not.be.disabled')
            }
            else {
                ele.should('be.disabled')
            }
        })
    }

    checkRadioElement(elements: checkElement[]) {
        elements.forEach(element => {
            //note that when i used cy.get('nb-radio') all were considered not disabled
            // note clicking on the disabled option gives no error
            let ele = cy.get('input[type=radio]').eq(element.index)

            if (element.disabled === false) {
                ele.not('[disabled]')
                ele.should('not.be.disabled')
            }
            else {
                ele.should('be.disabled')
            }

        })
    }

    assertButtonText(buttonText: string) {
        cy.contains('button', buttonText).invoke('text').then(data => {
            expect(data).to.equals(buttonText)
        })
    }

    assertValue(elements: InputElement[]) {
        elements.forEach(element => {
            cy.get('input').eq(element.index).then(data => {
                expect(data.val()).to.equals(element.text)
            })
        })
    }

    assertEmail(email: string) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }

    assertURL(URL: string) {
        cy.url().should('include', 'akveo/ngx-admin/issues') // => true
        cy.url().should('eq', 'https://github.com/akveo/ngx-admin/issues')
    }
}