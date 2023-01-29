//LESSON07
  //EXERCÍCIO EXTRA 02
  Cypress._.times(5, () =>
   it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.title()
      .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.get('#white-background')
      .should('have.class', 'privacy')
  }))