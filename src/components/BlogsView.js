const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

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
