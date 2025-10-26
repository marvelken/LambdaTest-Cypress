describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Welcome to Cypress Testing App");
    cy.get("[data-cy=get-started-btn]").should("be.visible");
  });

  it("Checks navigation", () => {
    cy.visit("/");
    cy.get("nav").should("be.visible");
    cy.get("nav a").should("have.length", 4);

    // Test navigation to users page
    cy.get("nav a").contains("Users").click();
    cy.url().should("include", "/users");
    cy.contains("h1", "User Management");
  });

  it("Tests user management functionality", () => {
    cy.visit("/users");

    // Add a new user
    cy.get("[data-cy=user-name]").type("Test User");
    cy.get("[data-cy=user-email]").type("test@example.com");
    cy.get("[data-cy=add-user-btn]").click();

    // Verify user was added
    cy.contains("Test User").should("be.visible");
  });
});
