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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {errorMessage ? <DisplayMessage message={errorMessage} /> : null}
      {user ? (
        <BlogsView blogs={blogs} />
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default App;
