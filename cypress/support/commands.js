Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get("input[id='firstName']").type('Afonso')
    cy.get("input[id='lastName']").type('Santos')
    cy.get("input[id='email']").type('contatoafonsohenrique@gmail.com')
    cy.get("textarea[id='open-text-area']").type('I can not access my course', {delay: 0})
    cy.clickSubmitButton()
})

Cypress.Commands.add('clickSubmitButton', function() {
    cy.contains("button" ,"Enviar").click()
})

Cypress.Commands.add('viewErrorMessage', function() {
    cy.get("span[class='error']").should('be.visible')
})

Cypress.Commands.add('viewSuccesfullMessage', function() {
    cy.get("span[class='success']").should('be.visible')
})