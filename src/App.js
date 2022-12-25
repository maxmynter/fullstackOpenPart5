import { useState, useEffect } from "react";
import BlogsView from "./components/BlogsView";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import DisplayMessage from "./components/MessageDisplay";
import CreateNewBlog from "./components/CreateNewBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {message ? <DisplayMessage message={message} /> : null}
      {user != null && (
        <>
          <BlogsView blogs={blogs} />
          <CreateNewBlog setMessage={setMessage} setBlogs={setBlogs} />
        </>
      )}
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
        setErrorMessage={setMessage}
      />
    </div>
  );
};

export default App;
