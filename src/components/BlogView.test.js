import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./BlogsView";

const blogEntry = {
  title: "Fancy Title",
  author: "Me",
  url: "abc.de",
  likes: 0,
  creator: {
    name: "Not Me",
  },
};

test("Blog component renders title and author", () => {
  render(<Blog blog={blogEntry} />);
  const titleText = screen.findByText("Fancy Title");
  const authorText = screen.findByText("Me");
  expect(titleText).toBeDefined();
  expect(authorText).toBeDefined();
});

test("Blog url and number of likes are not shown after when View Details is not pressed", async () => {
  render(<Blog blog={blogEntry} />);

  expect(await screen.queryByText("abc.de")).toBeNull();
  expect(await screen.queryByText("Likes")).toBeNull();
});

test("Blog url and number of likes are only shown after View Details is pressed", async () => {
  const user = userEvent.setup();
  render(<Blog blog={blogEntry} />);

  const button = screen.getByText("View Details");
  await user.click(button);
  let titleURL = await screen.queryByText("abc.de");
  let likes = await screen.queryByText("Likes");
  expect(titleURL).toBeDefined();
  expect(likes).toBeDefined();
});
