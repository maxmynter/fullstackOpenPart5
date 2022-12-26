import { useState, useEffect, useRef } from "react";
import BlogsView from "./components/BlogsView";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import DisplayMessage from "./components/MessageDisplay";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Toggleable";
import Logout from "./components/Logout";

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

  const addBlogRef = useRef();
  const toggleTogglable = () => {
    addBlogRef.current.toggleVisibility();
  };

  return (
    <div>
      {message ? <DisplayMessage message={message} /> : null}
      {user != null && (
        <>
          <BlogsView blogs={blogs} user={user} />
          <Togglable buttonLabel="Create Entry" ref={addBlogRef}>
            <CreateNewBlog
              setMessage={setMessage}
              setBlogs={setBlogs}
              toggleParentVisibility={toggleTogglable}
            />
          </Togglable>
        </>
      )}
      {user == null && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setErrorMessage={setMessage}
        />
      )}
      {user && <Logout user={user} setUser={setUser} />}
    </div>
  );
};

export default App;
