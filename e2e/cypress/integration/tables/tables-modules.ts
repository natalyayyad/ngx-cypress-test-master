/// <reference types="cypress" />
import { InputElement } from "../General-Interfaces";
export class Tables {

    getTable(header: string) {
        return cy.get('nb-card-header').contains(header).parent()
    }

    getInputFilterElements(elements: InputElement[]) {
        elements.forEach(element => {
            let ele = cy.get('input-filter').eq(element.index).find('input').eq(0)
            ele.type(element.text)
        })

    }

    getInputEditorElements(elements: InputElement[]) {
        elements.forEach(element => {
            let ele = cy.get('input-editor').eq(element.index).find('input').eq(0)
            ele.type(element.text, { force: true })
        })
    }

    getInputEditorElementsClear(elements: InputElement[]) {
        elements.forEach(element => {
            let ele = cy.get('input-editor').eq(element.index).find('input').eq(0).clear({ force: true })
            ele.type(element.text, { force: true })
        })
    }

    verifyInsertedRow(row: any, elements: InputElement[]) {
        elements.forEach(element => {
            // cy.wrap(row).find('td').eq(element.index).then(data => {
            //     expect(data.val()).to.equals(element.text)
            // })
            cy.wrap(row).find('td').eq(element.index).should('contain', element.text)

            //cy.wrap(row).find('td').eq(element.index).should('contain', element.text)
        })

    }

    updateRowByIndex(index: number, elements: InputElement[]) {
        this.getTable('Smart Table').find('tbody tr').eq(index).within((row) => {
            cy.wrap(row).find('.nb-edit').click({ force: true })
            this.getInputEditorElementsClear(elements)
            cy.wrap(row).find('.nb-checkmark').click({ force: true })

        })

        // const elements2 = elements.map(function (e) {
        //     e.index += 1
        //     return e
        // })
        // this.getTable('Smart Table').within((smartTable) => {
        //     cy.wrap(smartTable).find('tbody tr').first().then((firstRow) => {
        //         this.verifyInsertedRow(firstRow, elements2)
        //     })
        // })
        this.getTable('Smart Table').find('tbody tr').first().then((firstRow) => {
            this.verifyInsertedRow(firstRow, elements)
        })

    }

    deleteRowByIndex(index: number) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click({ force: true }).then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    }
}

export const Table = new Tables()