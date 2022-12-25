import { useState } from "react";
import blogService from "../services/blogs";

const CreateNewBlog = ({ setMessage, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await blogService.addBlog({ title, author, url });
    console.log(response);
    setBlogs(await blogService.getAll());
    setMessage(`${response.statusText}`);
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
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        Author:{" "}
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        URL:{" "}
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setURL(target.value)}
        ></input>
      </div>
      <button>Create</button>
    </form>
  );
};

export default CreateNewBlog;
