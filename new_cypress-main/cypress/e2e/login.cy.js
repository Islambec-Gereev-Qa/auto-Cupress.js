import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
     });
    afterEach('Конец теста', function () {
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.close).should('be.visible');;
     });
    it('Верный Логин, верный пароль', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).contains('Авторизация прошла успешно');
     })
     it('Проверка востановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })
     it('Верный Логин, не верный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('Loveqastudio1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })
    it('Не верный Логин, верный пароль', function () {
        cy.get(main_page.email).type('german@dolniko.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })
    it('В логине нет @, верный пароль', function () {
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })
    it('Не соблюдение регстра в Логине, верный пароль', function () {
        cy.visit('/');
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })
 })
 
 
 // запуск через терминал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 