# Inicializar um projeto Node
    ``` npm
        npm init --y
    ```
# Instalar o Cypress
    ``` npm
        npm i -D cypress
        npm i -D cypress@12.5.0
    ```

# Abrir o Cypress
    ``` npm
        npx cypress open 
    ```
> Abre a interface gráfica do Cypress.

    ``` npm
        npx cypress run 
    ```
> Executa os testes em "headless mode".
> Opções de execução em linha: <a href="https://docs.cypress.io/guides/guides/command-line#How-to-run-commands" target="_blank"></a>

## Linha de comando
A linha de comando permite receber parâmetros ara a execução.
No exemplo abaixo executamos os testes em uma resolução diferente da padrão, emulando um dispositivo móvel.

``` npm
    npx cypress run --config viewportHeight={altura},viewportWidth={largura}
    npx cypress run --config viewportHeight=1000,viewportWidth=600
```
> **Nota:** `altura` e `largura` devem sem informados como números inteiros.


# Arquivos gerados por padrão
Conhecendo a estrutura de pastas do Cypress.

## cypress.config.js
Arquivo de configurações de ambiente do Cypress.

## /cypress/e2e
Arquivos de testes em si, todos ficam nele

## /cypress/fixtures
Arquivos que geram dados para serem utilizados ao longo dos testes. Os famosos (mocks)

## /cypress/fixtures
Arquivos auxiliares dos testes.

# Configurações do Cypress para autocomplete e snippets
1. Crie um arquivo chamado `jsconfig.json` na rain do projeto com o seguinte conteúdo:

    ``` json
        {
            "include": ["./node_modules/cypress", "cypress/**/*.js"]
        }
    ```

# Comandos básicos
Alguns dos comandos básicos do Cypress.
> Documentação completa em <a href="https://docs.cypress.io/" target="_blank"></a>

## describe()
Agrupa as funções de teste que devem ser executadas (`it`)

``` javascript
    // Agrupa testadores `it`
    describe('Titulo do agrupador', () => {
        it('', () => {})
    })
```

## cy.contains()
Busca na tela o elemento que corresponda ao texto específicado no parâmetro.
O primeiro parâmetro pode ser a tag/seletor e o segundo o texto a se buscar.

``` javascript
    // Busca por elementos 
     cy.contains('Texto de busca').click()
     cy.contains('button', 'Salvar').click()

```

## cy.get()
Busca por elementos na tela, recebe como parâmetro o identificador do(s) elementos que se deseja resgatar. Funciona como os seletores do `jQuery`/`CSS`.

``` javascript
    // Resgata elementos pelo seletor
    cy.get('.seletor')
```

## cy.type()
Serve para inserção de texto após a seleção do elemento alvo (`inputs`). Recebe como parâmetro uma string com o valor a ser inserido na input.

``` javascript
    // Resgata a input e escreve nela "Olá mundo!"
    cy.get('#minha-input').type('Olá mundo')
```

## Asserções
Asserções são validatores de que a ação que esperamos realmente ocorreu.
Existem muitos tipos de validadores para cada coisa que você possa imaginar, sempre consulte a documentação.
A função abaixo faz o teste em um elemento especificado, se o elemento atender tiver o texto "Freela", o teste segue, senão, lança erro.
``` javascript
    cy.get('.seletor').should('have.text', 'Olá mundo')
```

## Hooks
São techos de código para executar antes ou depois / de cada ou todos os testes.

> **`before`**: é executado antes de todos os testes (apenas uma vez)
> **`beforeEach`**: é executado antes de cada teste 

> **`after`**: é executado depois de todos os testes (apenas uma vez)
> **`afterEach`**: é executado depois de cada teste

## Mapeamento de elementos
Mapeameamento nada mais é que a forma com que resgatamos os elementos da tela, sendo que há inúmeras formas de se fazer isto. Abaixo é apresentado algumas formas de mapeamaneto, sendo a primeira mais básica e a segunda mais "avançada". É utilizado o mesmo exemplo do teste de "Excluir transação".

``` javascript
    // Forma básica
    cy.contains('.description', 'Presente') // td -> referência para a coluna
        .parent() // tr -> referência para a linha
        .find('img') // elemento que a gente precisa
        .click()

    // Forma avançada
    cy.contains('.description', 'Presente') // td -> referência para a coluna
        .siblings() // resgata os irmãos deste elemento
        .children('img') // seleciona o irmão que tem a imagem
        .click()
```