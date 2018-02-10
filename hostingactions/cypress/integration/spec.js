describe('Hostingactions app', () => {
    beforeEach(() => {
        cy.visit('/hostingactions')
    });

    it('contains email-action', () => {
        cy.contains('.email-action .button--launch', 'Manage Email Accounts')
    });

    it('contains backend-choice-action', () => {
        cy.contains('.backend-choice-action .button--launch', "Choose backend")
    });

    it('launches and closes email-action', () => {
        cy.contains('.email-action .button--launch', 'Manage Email Accounts').click();
        cy.contains('h3', 'Manage Email Accounts');
        cy.contains('.email-action .button--ok', 'Ok').click();
        cy.contains('.email-action .button--launch', 'Manage Email Accounts');
    });
})