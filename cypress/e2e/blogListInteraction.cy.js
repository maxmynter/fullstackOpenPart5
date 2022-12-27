describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.addAndLogin({ username: "Max", name: "Max", password: "123" });
  });

  it("logged-in user can create a new blog", function () {
    cy.contains("Create Entry").click();
    cy.get("#titleInput").type("Blog Title");
    cy.get("#authorInput").type("Blog Author");
    cy.get("#urlInput").type("Blog URL");
    cy.get("#createNewBlogButton").click();
    cy.contains("Blog Title");
    cy.contains("Blog Author");
  });
});
