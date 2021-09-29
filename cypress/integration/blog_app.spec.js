describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Leandro',
      username: 'lean',
      password: 'lean1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('lean')
      cy.get('#password').type('lean1234')
      cy.get('#login-button').click()

      cy.contains('lean logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('lean')
      cy.get('#password').type('casihrno')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('lean')
      cy.get('#password').type('lean1234')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('historias de la pampa')
      cy.get('#author').type('leandro')
      cy.get('#url').type('http://rrbakery.com.ar')
      cy.get('#create-button').click()

      cy.contains('historias de la pampa leandro')
    })
  })
})