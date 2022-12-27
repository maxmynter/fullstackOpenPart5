import Togglable from "./Toggleable";
import blogService from "../services/blogs";
import { useState } from "react";

const LikeButton = ({ onClickHandler }) => (
  <button onClick={onClickHandler}>Like</button>
);

const Blog = ({ blog, canDelete }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [deleted, setDeleted] = useState(false);

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

  const onClickDelete = (blog) => {
    if (
      window.confirm(`Do you really want to delete the entry ${blog.title}?`)
    ) {
      blogService.deleteBlog(blog.id);
      setDeleted(true);
    }
  };

  return (
    <>
      {!deleted && (
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <Togglable buttonLabel="View Details" hideLabel="Hide">
            <div>URL: {blog.url}</div>
            <div>
              Likes: {likes}{" "}
              <LikeButton
                onClickHandler={() => {
                  updateLikesinBackend();
                  setLikes(likes + 1);
                }}
              />
            </div>
            <div>Creator: {blog.creator.name}</div>
            {canDelete && (
              <button onClick={() => onClickDelete(blog)}>Delete</button>
            )}
          </Togglable>
        </div>
      )}
    </>
  );
};

const BlogsView = ({ blogs, user }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            canDelete={user.id === blog.creator.id}
          />
        ))}
    </>
  );
};

export { BlogsView, Blog };
