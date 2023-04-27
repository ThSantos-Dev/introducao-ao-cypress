
describe('first', () => {

    // É executado uma vez antes de todos os testes
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#')
    });

    it('Cria um lançamento de entrada', () => {
        // Abre o site que iremos testar - Abstraído para o Hook beforeEach
        // cy.visit('https://devfinance-agilizei.netlify.app/#')

        criarTransacao('Freela', 2000)
        // criarTransacao('Freela do fim de semana', 700)

        // Verifica se a transação foi adicionada com sucesso
        cy.get('tbody tr td.description').should('have.text', 'Freela')
        // cy.get('tbody tr td.description').should('have.text', 'Freela do fim de semana')
    });

    it('Cria um lançamento de saída', () => {
        // Abre o site que iremos testar - Abstraído para o Hook beforeEach
        // cy.visit('https://devfinance-agilizei.netlify.app/#')

        criarTransacao('Cinema', -100)

        // Verifica se a transação foi adicionada com sucesso
        cy.get('tbody tr td.description').should('have.text', 'Cinema')
    });

    it('Excluir transação', () => {

        criarTransacao('Presente', 50)
        criarTransacao('Suco Kapo', -7)
        criarTransacao('Freela', 400)

        // Remove a transação
        // cy.contains('.description', 'Presente') // td -> referência para a coluna
        //     .parent() // tr -> referência para a linha
        //     .find('img') // elemento que a gente precisa
        //     .click()

        cy.contains('.description', 'Presente') // td -> referência para a coluna
            .siblings() // resgata os irmãos deste elemento
            .children('img') // seleciona o irmão que tem a imagem
            .click()

        // Verifica se a transação foi removida com sucesso
        cy.get('tbody tr').should('have.length', 2)

    });

})

function criarTransacao(descricao, valor) {
    // Abre a modal para adicionar uma transação
    cy.contains('Nova Transação').click()

    // Preenche os campos da modal
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type('2023-04-21') // YYYY-MM-DD

    // Aciona o botão de salvar
    cy.contains('button', 'Salvar').click()

}