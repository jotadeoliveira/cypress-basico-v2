/// <reference types="Cypress" />

//LESSON01
describe('Central de Atendimento ao Cliente TAT', function () {
	const threeSecondsInMS = 3000
	
	beforeEach(() => {
		cy.visit('./src/index.html')
	})

	it('verifica o título da aplicação', function () {
		cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
	})

//LESSON02
	//EXERCÍCIO EXTRA 1
	it('preenche os campos obrigatórios e envia o formulário', function () {
		cy.clock()
		
		cy.get('#firstName').type('Jonatas', { 'delay': 0 })
		cy.get('#lastName').type('de Oliveira')
		cy.get('#email').type('csjconf@hotmail.com')
		cy.get('#open-text-area').type('Cursos de Cypress')
		cy.contains('button', 'Enviar').click()

		cy.get('.success').should('be.visible')
		cy.tick(threeSecondsInMS)
		cy.get('.success').should('not.be.visible')
	})

	//EXERCÍCIO EXTRA 2
	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
		cy.clock()

		cy.get('#firstName').type('Jonatas', { delay: 0 })
		cy.get('#lastName').type('de Oliveira')
		cy.get('#email').type('csjconf!hotmail.com')
		cy.get('#open-text-area').type('Cursos de Cypress')
		cy.contains('button', 'Enviar').click()
		cy.get('.error').should('be.visible')
		cy.tick(threeSecondsInMS)
		cy.get('.error').should('not.be.visible')
	})

	//EXERCÍCIO EXTRA 3
	it('valida campo de telefone continua vazio, ao digitar valor não-numérico', function () {
		cy.get('#phone')
			.type('A()!ol')
			.should('have.value', '')
	})

	//EXERCÍCIO EXTRA 4
	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
		cy.clock()
		
		cy.get('#firstName').type('Jonatas')
		cy.get('#lastName').type('de Oliveira')
		cy.get('#email').type('csjconf@hotmail.com')
		cy.get('#phone-checkbox').check()
		cy.get('#open-text-area').type('Cursos de Cypress')
		cy.contains('button', 'Enviar').click()
		
		cy.get('.error').should('be.visible')
		cy.tick(threeSecondsInMS)
		cy.get('.error').should('not.be.visible')
	})

	//EXERCÍCIO EXTRA 5
	it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
		cy.get('#firstName')
			.type('Jonatas')
			.should('have.value', 'Jonatas')
			.clear()
			.should('have.value', '')

		cy.get('#lastName')
			.type('de Oliveira')
			.should('have.value', 'de Oliveira')
			.clear()
			.should('have.value', '')

		cy.get('#email')
			.type('csjconf@hotmail.com')
			.should('have.value', 'csjconf@hotmail.com')
			.clear()
			.should('have.value', '')

		cy.get('#phone')
			.type('11999999999')
			.should('have.value', '11999999999')
			.clear()
			.should('have.value', '')
	})

	//EXERCÍCIO EXTRA 6
	it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
		cy.clock()

		cy.contains('button', 'Enviar').click()
		cy.get('.error').should('be.visible')
		cy.tick(threeSecondsInMS)
		cy.get('.error').should('not.be.visible')
	})

	//EXERCÍCIO EXTRA 7
	it('envia o formuário com sucesso usando um comando customizado', function () {
		cy.fillMandatoryFieldsAndSubmit()

		cy.get('.success').should('be.visible')
	})

	//EXERCÍCIO EXTRA 8
	//TROCAR O cy.get('.button') POR cy.contains('Enviar')   

//LESSON03
	//EXERCÍCIO 01
	it('seleciona um produto (YouTube) por seu texto', function () {
		cy.get('#product')
			.select('YouTube')
			.should('have.value', 'youtube')
	})

	//EXERCÍCIO EXTRA 01
	it('seleciona um produto (Mentoria) por seu valor (value)', function () {
		cy.get('#product')
			.select('mentoria')
			.should('have.value', 'mentoria')
	})

	//EXERCÍCIO EXTRA 02
	it('seleciona um produto (Blog) por seu índice', function () {
		cy.get('#product')
			.select(1)
			.should('have.value', 'blog')
	})

//LESSON04
	//EXERCÍCIO 01
	it('marca o tipo de atendimento "Feedback"', function () {
		cy.get('input[type="radio"]')
			.check('feedback')
			.should('be.checked')
			.and('have.value', 'feedback')
	})
	
	//EXERCÍCIO EXTRA 01
	it('marca cada tipo de atendimento', function () {
		cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
	})

//LESSON05
	//EXERCÍCIO 01
	it('marca ambos checkboxes (E-mail e Telefone), depois desmarca o último', function () {
		cy.get('input[type="checkbox"]') 
			.should('have.length', 2)
			.check()
			.should('be.checked')
			.last().uncheck()
			.should('not.be.checked')
	})

//LESSON06
	//EXERCÍCIO 01
	it('seleciona um arquivo da pasta fixtures', function () {
		cy.get('input[type="file"]')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json')
			.then(input => {
				expect(input[0].files[0].name).to.equal('example.json')
			})
	})

	//EXERCÍCIO EXTRA 01
	it('seleciona um arquivo simulando um drag-and-drop', function () {
		cy.get('input[type="file"]')
			.should('not.have.value')
			.selectFile('cypress/fixtures/profile.json', {action: 'drag-drop'})
			.then(input => {
				expect(input[0].files[0].name).to.equal('profile.json')
			})
	})

	//EXERCÍCIO EXTRA 02
	it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
		cy.fixture('users.json').as('myFile')
		cy.get('input[type="file"]')
			.should('not.have.value')
			.selectFile('@myFile')
			.then(input => {
				console.log(input)
				expect(input[0].files).to.have.length(1)
				expect(input[0].files[0].name).to.equal('users.json')
			})
	})

//LESSON07
	//EXERCÍCIO 01
	it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
		cy.get('#privacy a')
			.should('have.attr', 'target', '_blank')
	})
	
	//EXERCÍCIO EXTRA 01
	it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
		cy.get('#privacy a')
			.invoke('removeAttr', 'target')
			.click()
		cy.contains('CAC TAT - Política de privacidade')
			.should('be.visible')
	})

//LESSON11
	//EXERCÍCIO EXTRA 02
	it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function () {
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
	
	//EXERCÍCIO EXTRA 03
	it('preenche a area de texto usando o comando invoke', function () {
		const longTextInput = Cypress._.repeat('Cursos de Cypress Básico, Intermediário e Avançado ', 5)
		cy.get('#open-text-area')
			.invoke('val', longTextInput)
			.should('have.value', longTextInput)
	})

	//EXERCÍCIO EXTRA 04
	it('faz uma requisição HTTP', function () {
		cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
			.should(function (response) {
				const { status, statusText, body } = response
			expect(status).to.equal(200);
			expect(statusText).to.equal('OK');
			expect(body).to.include('CAC TAT')
		})
	})

//LESSON12
	//DESAFIO ENCONTRE O GATO
	it('Desafio encontre o gato escondido', function () {
		cy.get('#cat')
			.invoke('show')
			.should('be.visible')
	})
})