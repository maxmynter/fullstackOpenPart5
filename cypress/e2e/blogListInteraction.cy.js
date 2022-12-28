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

  it("Can like blog", function () {
    const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
    cy.postBlog({
      title: "New Blog",
      author: "Me",
      url: "williiee.de",
      token: user.token,
    });
    cy.visit("http://localhost:3000");
    cy.contains("New Blog");
    cy.get("#toggableButton").click();
    cy.contains("Likes: 0");
    cy.get("#likeButton").click();
    cy.contains("Likes: 1");
  });

  it("User who has created blog can delete", function () {
    const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
    cy.postBlog({
      title: "New Blog",
      author: "Me",
      url: "williiee.de",
      token: user.token,
    });
    cy.visit("http://localhost:3000");
    cy.contains("New Blog");
    cy.get("#toggableButton").click();
    cy.get("#deleteButton").click();
    cy.get("#deleteButton").should("not.exist");
  });

  it("Other users cannot delete blog", function () {
    const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
    cy.postBlog({
      title: "New Blog",
      author: "Me",
      url: "williiee.de",
      token: user.token,
    });

    cy.get("#logoutButton").click();

    console.log("IN JUICE");
    cy.addAndLogin({
      name: "another",
      username: "another",
      password: "another",
    });

    cy.visit("http://localhost:3000");
    cy.contains("New Blog");
    cy.get("#toggableButton").click();
    cy.get("#deleteButton").should("not.exist");
  });
});
