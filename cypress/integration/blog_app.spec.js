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

  describe('When blog is created', () => {
    beforeEach(function() {
      cy.get('#username').type('lean')
      cy.get('#password').type('lean1234')
      cy.get('#login-button').click()
      cy.contains('New Blog').click()
      cy.get('#title').type('historias de la pampa')
      cy.get('#author').type('leandro')
      cy.get('#url').type('http://rrbakery.com.ar')
      cy.get('#create-button').click()
    })

    it('A blog can be liked', function() {
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.reload()
      cy.contains('View').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('View').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.reload()
    })
  })

  describe('When 2 blogs are created', () => {
    beforeEach(function() {
      cy.get('#username').type('lean')
      cy.get('#password').type('lean1234')
      cy.get('#login-button').click()
      cy.contains('New Blog').click()
      cy.get('#title').type('historias de la pampa')
      cy.get('#author').type('leandro')
      cy.get('#url').type('http://rrbakery.com.ar')
      cy.get('#create-button').click()
      cy.reload()
      cy.contains('New Blog').click()
      cy.get('#title').type('historias de la pampa2')
      cy.get('#author').type('leandro')
      cy.get('#url').type('http://rrbakery.com.ar2')
      cy.get('#create-button').click()
      cy.wait(5000)
      cy.reload()
    })

    it('The one with the most likes stays on top', () => {
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.get('.view-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
      cy.wait(3000)
      cy.reload()
      cy.get('.view-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
      cy.reload()
      cy.get('.blog').first().contains('historias de la pampa2 leandro')
    })
  })
})