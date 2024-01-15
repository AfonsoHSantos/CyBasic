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

    it('CACTAT-4: Error message is displayed when email with whrong format is added', function() {
        cy.get("input[id='firstName']").type('Afonso')

        cy.get("input[id='lastName']").type('Santos')

        cy.get("input[id='email']").type('invalid.mail')

        cy.get("textarea[id='open-text-area']").type('I can not access my course', {delay: 0})
        
        cy.clickSubmitButton()

        cy.viewSuccesfullMessage()
    })

    it('CACTAT-11: "Telefone" field remains blank when non-digits are added to the field', function() {
        cy.get("input[id='phone-checkbox']").check()

        cy.get("input[id='phone']").type('Phone Number').should('have.value', '')
    })

    it('CACTAT-5: Error message is displayed when phone is a mandatory field but is not filled', function() {
        cy.get("input[id='firstName']").type('Afonso')

        cy.get("input[id='lastName']").type('Santos')

        cy.get("input[id='email']").type('contatoafonsohenrique@gmail.com')

        cy.get("textarea[id='open-text-area']").type('I can not access my course', {delay: 0})

        cy.get("input[id='phone-checkbox']").check()
        
        cy.clickSubmitButton()

        cy.viewSuccesfullMessage()
    })

    it('CACTAT-6: Fill mandatory fields and clear them', function() {
        cy.get("input[id='firstName']")
        .type('Afonso')
        .should('have.value', 'Afonso')
        .clear()
        .should('have.value', '')

        cy.get("input[id='lastName']")
        .type('Santos')
        .should('have.value', 'Santos')
        .clear()
        .should('have.value', '')

        cy.get("input[id='email']")
        .type('contatoafonsohenrique@gmail.com')
        .should('have.value', 'contatoafonsohenrique@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get("textarea[id='open-text-area']")
        .type('I can not access my course', {delay: 0})
        .should('have.value', 'I can not access my course')
        .clear()
        .should('have.value', '')

        cy.get("input[id='phone']")
        .type('12345678')
        .should('have.value', '12345678')
        .clear()
        .should('have.value', '')
    })

    it('CACTAT-7: Error message when mandatory fields are not filled', function() {
        cy.clickSubmitButton()

        cy.viewSuccesfullMessage()
    })

    it('CACTAT-9: Submit form using Custom Command', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.viewErrorMessage()
    })

    it('CACTAT-12: Selects the product "Youtube" by value', function() {
        cy.get("select[id='product']")
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('CACTAT-13: Selects the product "Mentoria" by text', function() {
        cy.get("select[id='product']")
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('CACTAT-14: Selects the product "Blogs" by index', function() {
        cy.get("select[id='product']")
        .select(1)
        .should('have.value', 'blog')
    })

    it('CACTAT-15: Check Service Type "Feedback"', function() {
        cy.get("input[type='radio'][value='feedback']")
        .check()
        .should('have.value', 'feedback')
    })

    it('CACTAT-16: Check each Service Type', function() {
        cy.get("input[type='radio']")
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('CACTAT-17: Check both checkboxes and uncheck the last one', function() {
        cy.get("input[type='checkbox']")
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('CACTAT-18: Upload a file from fixtures dir', function() {
        cy.get("input[id='file-upload']")
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('CACTAT-19: Upload a file from fixtures dir simulating a drag and drop', function() {
        cy.get("input[id='file-upload']")
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
})

