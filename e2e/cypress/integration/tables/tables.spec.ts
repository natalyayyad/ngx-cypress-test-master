/// <reference types="cypress" />
import { Forms } from "../forms/forms-modules";
import { Tables, Table } from "./tables-modules";

describe('tables', () => {

    beforeEach(() => {
        // go to page
        cy.visit("http://localhost:4200/pages/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //cy.visit('http://localhost:4200/pages/tables/smart-table')

        //pull data
        cy.fixture('example').as('data')
    })

    it('verify overall rows count', () => {
        let length = 0
        for (let n = 0; n < 6; n++) {
            Table.getTable('Smart Table').within((smartTable) => {
                cy.wrap(smartTable).find('tbody tr').then((rows) => {
                    length += rows.length
                    if (n == 5) {
                        cy.get('a[aria-label=Next]').invoke('css', 'pointer-events').should('equal', 'none')
                        expect(length).to.eq(60)
                    }
                    else {
                        //cy.get('a[aria-label=Next]').should('not.have.attr', 'disabled')
                        cy.get('a[aria-label=Next]').click()
                    }
                })
            })
        }
    })

    it('insert row to smart table', () => {
        Table.getTable('Smart Table').within((smartTable) => {
            cy.get('@data').then((dummydata: any) => {
                cy.wrap(smartTable).find('.nb-plus').click({ force: true })
                Table.getInputEditorElements([{ index: 0, text: dummydata.id }, { index: 1, text: dummydata.firstname }, { index: 2, text: dummydata.lastname }, { index: 3, text: dummydata.username }, { index: 4, text: dummydata.email }, { index: 5, text: dummydata.age }])
                cy.wrap(smartTable).find('.nb-checkmark').click({ force: true })

                // verify data 
                cy.wrap(smartTable).find('tbody tr').first().then((firstRow) => {
                    Table.verifyInsertedRow(firstRow, [{ index: 1, text: dummydata.id }, { index: 2, text: dummydata.firstname }, { index: 3, text: dummydata.lastname },
                    { index: 4, text: dummydata.username }, { index: 5, text: dummydata.email }, { index: 6, text: dummydata.age }])
                })
            })
        })
    })

    it('update row data', () => {
        cy.get('@data').then((dummydata: any) => {
            //update and verify
            // problem here
            Table.updateRowByIndex(0, [{ index: 0, text: dummydata.id }, { index: 1, text: dummydata.firstname }, { index: 2, text: dummydata.lastname }, { index: 3, text: dummydata.username }, { index: 4, text: dummydata.email }, { index: 5, text: dummydata.age }])
        })
    })

    it('search smart table by age', () => {
        const ages = [20, 30, 40, 100]
        cy.wrap(ages).each((age: number) => {
            cy.get('input[placeholder=Age]').clear().type(age + "")
            cy.wait(1000)

            Table.getTable('Smart Table').find('tbody tr').each((row) => {
                if (age < 100) {
                    cy.wrap(row).find('td').eq(6).should('contain', age)
                } else {
                    cy.wrap(row).should('contain', 'No data found')
                }
            })
        })
    })

    it('delete row by index', () => {
        Table.deleteRowByIndex(3)
    })
})