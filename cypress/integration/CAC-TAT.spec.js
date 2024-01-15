/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('CACTAT-2: View Application Title', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('CACTAT-3: Fill mandatory fields and submit form', function() {
        cy.get("input[id='firstName']").type('Afonso')

        cy.get("input[id='lastName']").type('Santos')

        cy.get("input[id='email']").type('contatoafonsohenrique@gmail.com')

        cy.get("textarea[id='open-text-area']").type('I can not access my course', {delay: 0})
        
        cy.clickSubmitButton()

        cy.viewErrorMessage()
    })

})

