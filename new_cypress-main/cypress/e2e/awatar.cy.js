import * as data from "../helpers/def_dat.json"

describe('Покупка атара e2e', function () {
    beforeEach('Начало теста', function () {
        cy.visit('https://pokemonbattle.ru');
     });
    afterEach('Конец теста', function () {
        cy.get('.payment__padding').contains('Покупка прошла успешно');
        cy.get('.payment__padding').should('be.visible');
     });
    it('Путь пользователя', function () {
         cy.get(':nth-child(1) > .auth__input').type(data.login);
         cy.get('#password').type(data.password);
         cy.get('.auth__button').click({ force: true });
         cy.wait(1000);
         cy.get('.header__container > .header__id').click({ force: true });
         cy.wait(1000);
         cy.get('[href="/shop"]').click({ force: true });
         cy.wait(1000);
         cy.get('.available > button').first().click({ force: true });
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4999991111111113');
         cy.get(':nth-child(1) > .pay_base-input-v2').type('10/25');
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('german dolnikov');
         cy.get('.pay-btn').click({ force: true });
         cy.get('#cardnumber').type('56456');
         cy.get('.payment__submit-button').click({ force: true });
     })
 })
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome