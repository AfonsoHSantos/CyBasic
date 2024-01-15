/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('CACTAT-2: View Application Title', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

})

