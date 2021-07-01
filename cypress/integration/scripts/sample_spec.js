context('Huel Website', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
      cy.visit('https://uk.huel.com/')
    })
  
    it('Can see the cookie banner', () => {
      cy.title().should('include', 'Huel | Complete Food')
  
      cy.get('.cookieBanner')
        .should('be.visible')
    })

    it('Navbar works or desktop and mobile devices', () => {
        cy.get('.navbar-brand').should('be.visible')
    
        cy.get('.navbar-burger').as('burger')
    
        cy.get('@burger').should('not.be.visible')
    
        cy.viewport('iphone-x')
    
        cy.get('#huel-navbar')
          .should('not.be.visible')
          .should('not.have.class', 'is-active')
    
        cy.get('@burger')
          .should('be.visible')
          .click()
          .should('have.class', 'is-active')
    
        cy.get('#huel-navbar')
          .should('be.visible')
          .should('have.class', 'is-active')
      })

      it('Can buy that magic powder', () => {
        cy.log('Awesomeness')
    
        cy.contains('Shop Huel').click()
    
        cy.location().should((location) => {
          expect(location.hash).to.be.empty
          expect(location.pathname).to.eq('/collections/other-huel-products')
        })
    
        // Expected products are there
        cy.get('body')
          .should('contain.text', 'Huel Black Edition')
          .should('contain.text', 'Huel Hot & Savoury')
    
        cy.contains('Shop Black Edition').click()
    
        // Panel exists
        cy.get('.panel-flavours').should('be.visible')
    
        // Right elements are preselected
        cy.get('[aria-label="Salted Caramel Quantity"]').should('have.value', '1')
        cy.get('[aria-label="Banana Quantity"]').should('have.value', '1')
    
        cy.get('[aria-label="Vanilla Increase Quantity"]')
          .click()
          .click()
    
        cy.get('[aria-label="Vanilla Quantity"]').should('have.value', '2')
    
        cy.contains('Subscribe | Every').click()
    
        // Check upsell is there
        cy.get('body')
          .should('contain.text', 'Exclusive basket offers')
    
        cy.contains('Continue To Basket').click()
    
        // check Checkout is loaded
        cy.get('body').get('iframe')
      })

})