import { useState } from "react";
import blogService from "../services/blogs";

const CreateNewBlog = ({
  setMessage,
  setBlogs,
  toggleParentVisibility,
  createNewBlogEntry,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createNewBlogEntry({ title, author, url });
    setBlogs(await blogService.getAll());
    setMessage(`${response.statusText}`);
    toggleParentVisibility();
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Entry </h2>
      <div>
        Title:{" "}
        <input
          id="titleInput"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        Author:{" "}
        <input
          id="authorInput"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        URL:{" "}
        <input
          id="urlInput"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setURL(target.value)}
        ></input>
      </div>
      <button id="createNewBlogButton">Create</button>
    </form>
  );
};

export default CreateNewBlog;
