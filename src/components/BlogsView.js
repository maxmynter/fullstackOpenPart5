import Togglable from "./Toggleable";
import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateLikesinBackend = () => {
    blog.likes++;
    blogService.updateBlog(blog);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View Details" hideLabel="Hide">
        <div>URL: {blog.url}</div>
        <div>
          Likes: {likes}{" "}
          <button
            onClick={() => {
              updateLikesinBackend();
              setLikes(likes + 1);
            }}
          >
            Like
          </button>
        </div>
        <div>Creator: {blog.creator.name}</div>
      </Togglable>
    </div>
  );
};

const BlogsView = ({ blogs }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

export default BlogsView;
