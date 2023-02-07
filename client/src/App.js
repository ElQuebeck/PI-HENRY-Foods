import './App.css';
import {Home, Login, Detail, NavBar, Form } from "./Views"
import {Route, useLocation} from "react-router-dom"


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route path="/home" render={() => <Home />} />
      <Route exact path="/" render={() => <Login />} />
      <Route path='/detail/:id' render={() => <Detail />} />      
      <Route path="/create" render={() => <Form />} />      
    </div>
  );
}

export default App;
