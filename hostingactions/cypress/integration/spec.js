describe('Hostingactions app', function()  {
    beforeEach(function()  {
        cy.visit('/hostingactions')
    });

    it('contains email-action', function()  {
        cy.contains('.email-action .button--launch', 'Manage Email Accounts')
    });

    it('contains backend-choice-action', function()  {
        cy.contains('.backend-choice-action .button--launch', "Choose backend")
    });

    it('launches and closes email-action', function()  {
        cy.contains('.email-action .button--launch', 'Manage Email Accounts').click();
        cy.contains('h3', 'Manage Email Accounts');
        cy.contains('.email-action .button--ok', 'Ok').click();
        cy.contains('.email-action .button--launch', 'Manage Email Accounts');
    });

    it('adds email', function()  {
        cy.get('.email-action .button--launch').click();
        cy.get('.button--launch-add-email').click();

        cy.get('#userName').type('sam');
        cy.get('#displayName').type('Samwise Gamgee');
        cy.get('.button--confirm').click();

        cy.contains('.form__rows', 'sam@huzzl.de');
        cy.contains('.form__rows', 'Samwise Gamgee');
    });

    it('updates email', function()  {
        cy.get('.email-action .button--launch').click();
        cy.get('.button--launch-update-email').first().click();

        cy.get('#userName').clear().type('frodo');
        cy.get('#displayName').clear().type('Frodo Baggins');
        cy.get('.button--confirm').click();

        cy.contains('.form__rows', /\bfrodo@huzzl.de\b/); // in word boundaries
        cy.contains('.form__rows', /\bFrodo Baggins\b/);
    });

    it('validates user name', function()  {
        cy.get('.email-action .button--launch').click();
        cy.get('.button--launch-add-email').click();

        cy.get('#userName').as('userName'); // store userName input as alias

        cy.get('@userName').type('sam gamgee').blur();

        cy.get('@userName').should('have.class', 'form__input--error');
        cy.get('.form__error-message').should('have.text', '\'sam gamgee\' is not a valid account name');
        cy.get('.button--cancel').click();
    });

    it('validates on submit', function () {
        cy.get('.email-action .button--launch').click();
        cy.get('.button--launch-add-email').click();
        cy.get('.button--confirm').click();

        cy.get('#userName').should('have.class', 'form__input--error');
        cy.get('#displayName').should('have.class', 'form__input--error');
    });
});