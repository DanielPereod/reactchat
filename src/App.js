import React, { useState, useEffect } from "react";
import "./App.css";

//Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Firebase
import firebase from "./firebase/config";
import { getUser, createUser } from "./firebase/helpers";

//Components
import NavBar from "./components/NavBar";

//Screens
import Chats from "./screens/Chats";
import Friends from "./screens/Friends";
import Login from "./screens/Login";
import LoadScreen from "./screens/LoadScreen";

export const User = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getUser(user.uid, (res) => {
          if (!res) {
            createUser(user);
          }
        });
      }
      setisLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadScreen />;
  }

  if (user === null) {
    return <Login setUser={setUser} />;
  }
  return (
    <User.Provider value={{ setUser, user }}>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/chats">
              <Chats />
            </Route>
            <Route exact path="/friends">
              <Friends />
            </Route>
          </Switch>
        </Router>
      </div>
    </User.Provider>
  );
}

export default App;
