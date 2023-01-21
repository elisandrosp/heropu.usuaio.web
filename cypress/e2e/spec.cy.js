describe('user', () => {
    const idTest = Math.round(Math.random(0, 100));
    it('Should be register user', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input[name=Nome]').type(`Danillo Lima ${idTest}`);
        cy.get('input[name=Email]').type('danillol@gmail.com');
        cy.get('input[name=Cpf]').type('4081025563');
        cy.wait(500);
        cy.get('button[name=Cadastro]').click();
        cy.wait(2000);
        cy.get('table[name=Dados]').contains("danillol@gmail.com");
      })

      it('Should be delete user', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input[name=Nome]').type(`TESTE`);
        cy.get('input[name=Email]').type('danillol@gmail.com');
        cy.get('input[name=Cpf]').type('4081025563');
        cy.wait(500);
        cy.get('button[name=Cadastro]').click();
        cy.wait(2000);
        cy.get('table[name=Dados]').contains("danillol@gmail.com");

        cy.wait(2000);
        cy.get(`button[name=TESTE]`).click();
        cy.wait(2000);
      })
})