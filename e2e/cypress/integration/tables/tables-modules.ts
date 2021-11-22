/// <reference types="cypress" />
import { InputElement, InputElementPlaceHolder } from "../General-Interfaces";
export class Tables {

    getTable(header: string) {
        return cy.get('nb-card-header').contains(header).parent()
    }

    getColumnByPlaceHolder(placeholder: string) {
        return cy.get(`input[placeholder="${placeholder}"]`)
    }

    getInputFilterElements(elements: InputElementPlaceHolder[]) {
        elements.forEach(element => {
            this.getColumnByPlaceHolder(element.placeholder).eq(0).type(element.text)
        })
    }

    fillRowByColumnPlaceHolder(elements: InputElementPlaceHolder[]) {
        elements.forEach(element => {
            this.getColumnByPlaceHolder(element.placeholder).eq(1).type(element.text)
        })
    }

    fillRowByColumnPlaceHolderWithClear(elements: InputElementPlaceHolder[]) {
        elements.forEach(element => {
            this.getColumnByPlaceHolder(element.placeholder).eq(1).clear().type(element.text)
        })
    }

    verifyInsertedRowByColumnIndex(elements: InputElement[]) {
        elements.forEach(element => {
            cy.get('td').eq(element.index).should('contain', element.text)
        })

    }

    assertValue(elements: InputElement[]) {
        elements.forEach(element => {
            cy.get('input').eq(element.index).then(data => {
                expect(data.val()).to.equals(element.text)
            })
        })
    }

    updateRowByID(placeholder: string, elements: InputElementPlaceHolder[]) {
        this.getColumnByPlaceHolder("ID").type(placeholder)
        var index: number = +placeholder;
        cy.wait(1000)
        table.getTable('Smart Table').find('tbody tr').each((row) => {
            cy.log(row + "")
            cy.wrap(row).find('td').eq(1).invoke('text').then(data => {
                if (data == placeholder) {
                    cy.wrap(row).find('.nb-edit').click()
                    this.fillRowByColumnPlaceHolderWithClear(elements)
                    cy.wrap(row).find('.nb-checkmark').click()
                    this.getColumnByPlaceHolder("ID").clear()
                    return false;
                }
            })
        })
    }

    deleteRowByIndex(index: number) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    }
}

export const table = new Tables()