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

        cy.viewSuccesfullMessage()
    })

    it('CACTAT-4: Error message is displayed when email with whrong format is added', function() {
        cy.get("input[id='firstName']").type('Afonso')

        cy.get("input[id='lastName']").type('Santos')

        cy.get("input[id='email']").type('invalid.mail')

        cy.get("textarea[id='open-text-area']").type('I can not access my course', {delay: 0})
        
        cy.clickSubmitButton()

        cy.viewErrorMessage()
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

        cy.viewErrorMessage()
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

        cy.viewErrorMessage()
    })

    it('CACTAT-9: Submit form using Custom Command', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.viewSuccesfullMessage()
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

    it('CACTAT-20: Upload a file from fixtures dir usinga alias', function() {
        cy.fixture('example.json').as('sampleFile')

        cy.get("input[id='file-upload']")
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('CACTAT-21: Verify Policy Privacy page is opened in a new tab without click', function() {
        cy.get("div#privacy a")
       .should('have.attr', 'target', '_blank')
    })

    it('CACTAT-22: Access Policy Privacy page removing blank attribute', function() {
        cy.get("div#privacy a")
        .invoke('removeAttr', 'target')
        .click()
        
        cy.get('h1#title')
        .should('have.text', 'CAC TAT - Política de privacidade')
    })

    it('CACTAT-24: Show and hide success and error messages using .invoke() and .hide()', function() {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('CACTAT-25: Freeze error message using .clocl() and .tick()', function() {
        cy.clock()
      
        cy.clickSubmitButton()
      
        cy.viewErrorMessage()

        cy.tick(3000)
      
        cy.get('span[class="error"]').should('not.be.visible')
    })

    it('CACTAT-26: Fill text field using .invoke()', function() {
        const longText = Cypress._.repeat('0123456789\n', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('CACTAT-27: Use .request() to make a HTTP request', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })
})

