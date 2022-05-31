context('Huel Website', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('https://uk.huel.com/');
  });

  it('the cookie banner is visible!', () => {
    cy.get('#onetrust-button-group').should('be.visible');
  });

  it('Should have a title', () => {
    cy.contains(`The NEW Huel Bestseller Bundle`);
  });

  it('Navbar works or desktop and mobile devices', () => {
    cy.get('.navbar-brand').should('be.visible');

    cy.get('.navbar-burger').as('burger');

    cy.get('@burger').should('not.be.visible');

    cy.viewport('iphone-x');

    cy.get('#huel-navbar')
      .should('not.be.visible')
      .should('not.have.class', 'is-active');

    cy.get('@burger')
      .should('be.visible')
      .click()
      .should('have.class', 'is-active');

    cy.get('#huel-navbar')
      .should('be.visible')
      .should('have.class', 'is-active');
  });

  //Test Huel Bars purchase, return to home

  it('Buy Huel Hot & Savoury', () => {
    cy.log('Test Huel Hot and Savoury');
    cy.contains('Shop Huel Hot & Savoury').click();

    // Flavours Panel is there! and have correct title
    cy.get('.panel-heading').should('be.visible');

    cy.get('.panel-heading').children().contains('Flavours');

    // Flavours are present & have correct default values

    cy.get('[aria-label="Pasta Bolognese Increase Quantity"]').click().click();
    cy.get('[aria-label="Pasta Bolognese Quantity"]').should('have.value', '2');

    cy.get('[aria-label="Cajun Pasta Increase Quantity"]').click().click();
    cy.get('[aria-label="Cajun Pasta Quantity"]').should('have.value', '2');

    //Go to upsell page
    cy.get('.button.is-green').click();

    // Check upsell is there
    cy.get('body').should('contain.text', 'Exclusive basket offers');
    //  cy.get('[is-success="upsellSuccessIcon"]').click()
    cy.get('.button.is-success').click()
    // cy.contains('Continue To Basket').click()

    //check Checkout is loaded
    // cy.get('body').get('iframe');

    // cy.get('.navbar-item.basket-button.has-icon.is-tab.has-background-white-bis').click();
    //Return to Home to restart with new products
    // cy.viewport('macbook-16');
    // cy.visit('https://uk.huel.com/');
  });

  //Test BSB purchase
  it('Add BSB to Cart ', () => {
    cy.log('Buy Bestseller Bundle');
    cy.get('.button-2021').contains('Shop the Bestseller Bundle').click();

    // Subscribe to BSB
    cy.get('.button.is-green').click();

  });
});








// Expected products are there
//   // cy.get('body')
//   //   .should('contain.text', 'Huel Black Edition')
//   //   .should('contain.text', 'Huel Hot & Savoury')

//   // cy.contains('Shop Complete Protein').click()

//   // // Panel exists
//   // cy.get('.panel-flavours').should('be.visible')

//   // Right elements are preselected// changes applkied so have to change code
//   // cy.get('[aria-label="Vanilla Fudge Quantity"]').should('have.value', '1')
//   // cy.get('[aria-label="Strawberries & Cream Quantity"]').should('have.value', '1')

//   //Increase quantity of both flavours
//   cy.get('[aria-label="Strawberries & Cream Increase Quantity"]')
//     .click()
//     .click()

//     cy.get('[aria-label="Vanilla Fudge Increase Quantity"]')
//     .click()
//     .click()
//  //Check quantity
//   cy.get('[aria-label="Vanilla Fudge Quantity"]').should('have.value', '2')
//   cy.get('[aria-label="Strawberries & Cream Quantity"]').should('have.value', '2')

//   cy.contains('Subscribe | Every').click()

// cy.location().should((location) => {
//   expect(location.hash).to.be.empty
//   expect(location.pathname).to.eq('/collections/other-huel-products')
// })
