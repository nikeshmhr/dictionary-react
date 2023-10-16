describe("Dictionary spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
  })
  it("should display search bar and search button", () => {
    cy.get(".search-input").should("exist");
    cy.get("button").contains("Search");
  });

  it("should be able to input text to search bar", () => {
    cy.get(".search-input").type("Test");
    cy.get(".search-input").should("contain.value", "Test");
  });
});
