import Togglable from "./Toggleable";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View Details" hideLabel="Hide">
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes}</div>
        <div>Creator: {blog.creator.name}</div>
      </Togglable>
    </div>
  );
};

const BlogsView = ({ blogs }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogsView;
