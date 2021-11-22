/// <reference types="cypress" />
import { Forms } from "../forms/forms-modules";
import { table } from "./tables-modules";

describe('tables', () => {

    beforeEach(() => {
        // go to page
        cy.visit("http://localhost:4200/pages/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('.sidebar-toggle').click()
        //cy.visit('http://localhost:4200/pages/tables/smart-table')
        //pull data
        cy.fixture('example').as('data')
    })

    it('verify overall rows count', () => {
        let length = 0
        for (let n = 0; n < 6; n++) {
            table.getTable('Smart Table').within((smartTable) => {
                cy.wrap(smartTable).find('tbody tr').then((rows) => {
                    length += rows.length
                    if (n == 5) {
                        cy.get('a[aria-label=Next]').invoke('css', 'pointer-events').should('equal', 'none')
                        expect(length).to.eq(60)
                    }
                    else {
                        cy.get('a[aria-label=Next]').click()
                    }
                })
            })
        }
    })

    it('insert row to smart table', () => {
        table.getTable('Smart Table').within((smartTable) => {
            cy.get('@data').then((dummydata: any) => {
                cy.wrap(smartTable).find('.nb-plus').click()
                table.fillRowByColumnPlaceHolder([{ placeholder: "ID", text: dummydata.id }, { placeholder: "First Name", text: dummydata.firstname }, { placeholder: "Last Name", text: dummydata.lastname },
                { placeholder: "Username", text: dummydata.username }, { placeholder: "E-mail", text: dummydata.email }, { placeholder: "Age", text: dummydata.age }])
                cy.wrap(smartTable).find('.nb-checkmark').click()

                // verify data 
                cy.wrap(smartTable).find('tbody tr').first().then(() => {
                    table.verifyInsertedRowByColumnIndex([{ index: 1, text: dummydata.id }, { index: 2, text: dummydata.firstname }, { index: 3, text: dummydata.lastname },
                    { index: 4, text: dummydata.username }, { index: 5, text: dummydata.email }, { index: 6, text: dummydata.age }])
                })
            })
        })
    })

    it.only('update row data by ID', () => {
        cy.get('@data').then((dummydata: any) => {
            //update and verify
            //by id
            table.updateRowByID("3", [{ placeholder: "First Name", text: dummydata.firstname }, { placeholder: "Last Name", text: dummydata.lastname },
            { placeholder: "Username", text: dummydata.username }, { placeholder: "E-mail", text: dummydata.email }, { placeholder: "Age", text: dummydata.age }])

            table.getTable('Smart Table').within((smartTable) => {
                cy.wrap(smartTable).find('tbody tr').eq(3).then(() => {
                    table.verifyInsertedRowByColumnIndex([{ index: 2, text: dummydata.firstname }, { index: 3, text: dummydata.lastname },
                    { index: 4, text: dummydata.username }, { index: 5, text: dummydata.email }, { index: 6, text: dummydata.age }])
                })
            })
        })
    })

    it('search smart table by age', () => {
        const ages = [20, 30, 40, 100]
        cy.wrap(ages).each((age: number) => {
            cy.get('input[placeholder=Age]').clear().type(age + "")
            cy.wait(1000)

            table.getTable('Smart Table').find('tbody tr').each((row) => {
                if (age < 100) {
                    // find by placeholder
                    cy.wrap(row).find('td').eq(6).should('contain', age)
                } else {
                    cy.wrap(row).should('contain', 'No data found')
                }
            })
        })
    })

    it('delete row by index', () => {
        table.deleteRowByIndex(3)
    })
})