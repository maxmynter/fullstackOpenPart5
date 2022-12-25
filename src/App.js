import { useState, useEffect } from "react";
import BlogsView from "./components/BlogsView";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import DisplayMessage from "./components/MessageDisplay";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //noteService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {errorMessage ? <DisplayMessage message={errorMessage} /> : null}
      {user && <BlogsView blogs={blogs} />}
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
