import '@4tw/cypress-drag-drop'
import { dropAreaSelector } from '../../src/utils/data';

describe("main page", function () {

	it("dnd, order, modal window", function () {

		cy.visit('');

		cy.get(`[data-test="bun"] li:first-child`).drag(dropAreaSelector)
		cy.get(`[data-test="main"] li:first-child`).drag(dropAreaSelector)
		cy.get(`[data-test="sauce"] li:first-child`).drag(dropAreaSelector)

		cy.get(`[data-test="send-order"]`).contains('Оформить заказ').click()

		cy.get(`[data-test="email-input"]`).type(`dm.lyrae@ya.ru`)
		cy.get(`[data-test="pass-input"]`).type('10121012')
		cy.get(`[data-test="login"]`).contains('Войти').click()

		cy.get(`[data-test="send-order"]`).contains('Оформить заказ').click()

		cy.wait(30000);

		cy.get(`[data-test="modal-close"] svg`).click()

	});

	it("open ingredient's modal window", function () {
		cy.visit('');
		cy.get('[data-test="bun"] li:first-child').click()
		cy.get('[data-test="modal-close"] svg').click()
	})

})