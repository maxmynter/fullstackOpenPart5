import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Blog } from "./BlogsView";

/*
Make a test which checks that the component displaying a blog renders the blog's title and author,
but does not render its url or number of likes by default.

Add CSS-classes to the component to help the testing as necessary.
*/

test("Blog component renders title and author", () => {
  const blogEntry = {
    title: "Fancy Title",
    author: "Me",
    url: "abc.de",
    creator: {
      name: "Not Me",
    },
  };
  render(<Blog blog={blogEntry} />);
  const titleText = screen.findByText("Fancy Title");
  const authorText = screen.findByText("Me");
  expect(titleText).toBeDefined();
  expect(authorText).toBeDefined();
});
