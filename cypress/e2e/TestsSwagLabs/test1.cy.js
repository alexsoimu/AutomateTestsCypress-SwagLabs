describe("Swag Labs", () => {
  // Test de login cu user sau parola gresita (verifica daca ai un mesaj de eroare)
  it("Test de login (incorect)", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("abc");
    cy.get('[data-test="password"]').type("abc");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("exist");
  });

  // Test de login cu userul standard (verifica daca esti logat apoi)
  it("Test de login (standard)", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-sidebar-link"]').should("exist");
  });

  // Test de logout (trebuie sa fii logat inainte sa poti da logout - dupa ce te loghezi ai in stanga sus un meniu care contine logout)
  it("Test de logout", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get("#react-burger-menu-btn").click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.get('[data-test="username"]').should("exist");
  });

  // Test prin care verifici daca se poate deschide si inchide meniul lateral
  it("Test verificare meniu lateral", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get("#react-burger-menu-btn").click();
    cy.get("#react-burger-cross-btn").click();
    cy.get("#react-burger-menu-btn").should("exist");
  });

  // Test de adaugare al unui produs in cart (adaugi produsul in cart si verifici daca s-a adaugat)
  it("Test adaugare produs in cart", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("exist");
  });

  // Test de stergere al unui produs din cart (verifica daca produsul a disparut sau cartul este gol)
  it("Test stergere produs din cart", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="cart-quantity-label"]').should("exist");
  });

  // Test prin care verifici daca poti sa comanzi un produs (adauga un produs in cos si apoi urmeaza toti pasii de checkout pana la plasarea comenzii)
  it("Test comanda produs", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Alexandru");
    cy.get('[data-test="lastName"]').type("Soimu");
    cy.get('[data-test="postalCode"]').type("207220");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="back-to-products"]').should("exist");
  });

  // Test prin care sa verifici daca poti accesa pagina cu detaliile unui produs (pagina care apare cand dai click pe un produs)
  it("Test verificare detalii produs", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get(
      '[data-test="item-4-title-link"] > [data-test="inventory-item-name"]'
    ).click();
    cy.get('[data-test="item-sauce-labs-backpack-img"]').should("exist");
  });

  // Testeaza daca butonul “Back to products” de pe pagina unui produs te duce la pagina principala
  it("Test 'Back to products'", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get(
      '[data-test="item-4-title-link"] > [data-test="inventory-item-name"]'
    ).click();
    cy.get('[data-test="back-to-products"]').click();
    cy.get('[data-test="title"]').should("exist");
  });
});
