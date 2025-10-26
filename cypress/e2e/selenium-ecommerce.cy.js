// ./cypress/e2e/selenium-ecommerce.cy.js

describe("Ecommerce Playground - Basic Flow", () => {
  const baseUrl = "https://ecommerce-playground.lambdatest.io";

  it("should search for Apple Cinema and click the first result", () => {
    // 1. Visit the homepage
    cy.visit(baseUrl);

    // 2. Find the search bar and type "Apple Cinema"
    cy.get('input[name="search"][placeholder="Search For Products"]')
      .first()
      .type("Apple Cinema");

    // 3. Click the search button
    cy.get('button[type="submit"].type-text').contains("Search").click();

    // 4. Wait for the search results page to load
    cy.url().should("include", "route=product");
    cy.get(".product-thumb").should("exist");

    // 5. Click on the first product result
    cy.get(".product-thumb").last().find("a").first().click();

    // 6. Assert navigation to product page
    cy.url().should("include", "route=product/product");
    cy.get("h1,h4").should("contain.text", "Apple Cinema");

    // 7. Select a valid option from the dropdown (not the empty value)
    cy.get('select[name^="option"]').should("exist").first().select(1); // Selects the first valid option (index 1, since 0 is usually the placeholder)

    // 8. Wait for the "Buy now" button to be enabled and click it
    cy.get("button.button-buynow").should("not.be.disabled").click();

    // 9. Assert navigation to the checkout page
    cy.url().should("include", "route=checkout");

    // 10. Click on the "Guest Checkout" radio button
    cy.get('label[for="input-account-guest"]').click();

    // 11. Fill the account details form
    cy.get("#account-detail").first().should("be.visible");
    cy.get("#input-payment-firstname").first().type("John");
    cy.get("#input-payment-lastname").first().type("Doe");
    cy.get("#input-payment-email").first().type("john@example.com");
    cy.get("#input-payment-telephone").first().type("+1234567890");
    // cy.get("#input-payment-password").first().type("12345678");
    // cy.get("#input-payment-confirm").first().type("12345678");

    // 12. Fill the shipping address form

    // get main navigation and set it to display: none
    cy.get("#main-navigation")
      .should("be.visible")
      .then(($mainNav) => {
        $mainNav.css("display", "none");
      });

    cy.get("#payment-address").first().should("be.visible");
    // Fill in the Company field
    // scroll to position of the Company field
    cy.get("#input-payment-company").focus().clear().type("Test Company Ltd");

    // Fill in Address 1
    cy.get("#input-payment-address-1").clear().type("123 Test Street");

    // Fill in Address 2
    cy.get("#input-payment-address-2").clear().type("Suite 456");

    // Fill in City
    cy.get("#input-payment-city").clear().type("Testville");

    // Fill in Post Code
    cy.get("#input-payment-postcode").clear().type("TST123");

    // Select Country: United Kingdom (value="222")
    cy.get("#input-payment-country").select("United Kingdom");

    // Select Region/State: Lancashire (value="3563")
    cy.get("#input-payment-zone").select("Lancashire");

    // Agree to terms and conditions
    cy.get('label[for="input-agree"]').click();

    // Click the "Checkout" button
    cy.get("#button-save").click();

    // Assert navigation to the checkout page
    cy.url().should("include", "route=checkout");

    // Click the "Confirm Order" button
    cy.get("#button-confirm").click();

    // Assert navigation to the order confirmation page
    cy.url().should("include", "route=checkout/success");
  });
});
