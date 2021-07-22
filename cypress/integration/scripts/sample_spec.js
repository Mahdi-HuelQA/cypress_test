 context('Huel Website', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
      cy.visit('https://uk.huel.com/')
    })
  
    it('the cookie banner is visible', () => {
      cy.title().should('include', 'Huel | Complete Food')
  
      cy.get('.cookieBanner')
        .should('be.visible')
    })

    it('Should have a title', () => {
      cy.contains(`The World's no. 1 Complete Food`)

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

      //Test Huel Bars purchase, return to home

      it('Buy Huel bars', ()=>{
        cy.log('Test Huel Bars')
        cy.contains('Shop Huel').click()

        cy.contains('Shop Bars').click()

        // Flavours Panel is there! and have correct title
       cy.get('.panel-flavours').should('be.visible')
        
        cy.get('.panel-flavours').children().contains('Flavours')

        // Flavours are present & have correct default values
        cy.get('[aria-label="Selection Box - 18 Bars Quantity"]').should('have.value', '2')
        cy.get('[aria-label="Peanut Butter - 15 Bars"]').should('have.value', 'undefined')
        cy.get('[aria-label="Peanut Butter - 15 Bars Increase Quantity"]')
        .click().click()

        //Return to Home to restart with new products
        cy.viewport('macbook-16')
        cy.visit('https://uk.huel.com/')
        
      })

      // Test Protein purchase
      it('Buy Complete protein', () => {
        cy.log('Test Protein!!')
    
        cy.contains('Shop Huel').click()
    
        cy.location().should((location) => {
          expect(location.hash).to.be.empty
          expect(location.pathname).to.eq('/collections/other-huel-products')
        })
    
        // Expected products are there
        cy.get('body')
          .should('contain.text', 'Huel Black Edition')
          .should('contain.text', 'Huel Hot & Savoury')
    
        cy.contains('Shop Complete Protein').click()
    
        // Panel exists
        cy.get('.panel-flavours').should('be.visible')
    
        // Right elements are preselected
        cy.get('[aria-label="Vanilla Fudge Quantity"]').should('have.value', '1')
        cy.get('[aria-label="Strawberries & Cream Quantity"]').should('have.value', '1')
    
        cy.get('[aria-label="Strawberries & Cream Increase Quantity"]')
          .click()
          .click()
    
        cy.get('[aria-label="Vanilla Fudge Quantity"]').should('have.value', '1')
        cy.get('[aria-label="Strawberries & Cream Quantity"]').should('have.value', '3')
    
        cy.contains('Subscribe | Every').click()
    
        // Check upsell is there
        cy.get('body')
          .should('contain.text', 'Exclusive basket offers')
    
        cy.contains('Continue To Basket').click()
    
        // check Checkout is loaded
        cy.get('body').get('iframe')
      })

})