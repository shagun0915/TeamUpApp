import Profile from "./pages/profile/Profile";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Meeting from "./pages/meeting/Meeting";
import Callpage from "./pages/callpage/Callpage";
import Chat from "./pages/chat/Chat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/meeting">{!user ? <Redirect to="/"/>  : <Meeting />}
        </Route>
        <Route path="/chat">{!user ? <Redirect to="/"/> : <Chat />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/:id"><Callpage />
        </Route>

      </Switch>
    </Router>
  )
}

export default App;
