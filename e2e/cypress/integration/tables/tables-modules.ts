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
            //let ele = cy.get('input-filter').eq(element.index).find('input').eq(0)
            //ele.type(element.text)
        })

    }

    fillRowByColumnPlaceHolder(elements: InputElementPlaceHolder[]) {
        elements.forEach(element => {
            this.getColumnByPlaceHolder(element.placeholder).eq(1).type(element.text)
            //let ele = cy.get('input-editor').eq(element.index).find('input').eq(0)
            //ele.type(element.text)
        })
    }

    fillRowByColumnPlaceHolderWithClear(elements: InputElementPlaceHolder[]) {
        elements.forEach(element => {
            this.getColumnByPlaceHolder(element.placeholder).eq(1).clear().type(element.text)
            //let ele = cy.get('input-editor').eq(element.index).find('input').eq(0).clear({ force: true })
            //ele.type(element.text)
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
        table.getTable('Smart Table').find('tbody tr').each((row) => {
            let here = row
            cy.wrap(row).find('td').eq(1).invoke('text').then(data => {
                cy.log(data)
                if (data == placeholder) {
                    //expect(data).to.equals(placeholder);
                    cy.wrap(here).find('.nb-edit').click()
                    this.fillRowByColumnPlaceHolderWithClear(elements)
                    cy.wrap(row).find('.nb-checkmark').click()
                    this.getColumnByPlaceHolder("ID").clear()
                    return false;
                }
            })
        })

        // this.getTable('Smart Table').find('tbody tr').eq(index).within((row) => {
        //     cy.wrap(row).find('.nb-edit').click({ force: true })
        //     this.getInputEditorElementsClear(elements)
        //     cy.wrap(row).find('.nb-checkmark').click({ force: true })

        // })

        // this.getTable('Smart Table').find('tbody tr').first().then((frstRow) => {
        //     this.verifyInsertedRowByColumnIndex(elements)
        // })

    }

    //delete by ID
    deleteRowByIndex(index: number) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click({ force: true }).then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    }
}

export const table = new Tables()