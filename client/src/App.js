import "./App.css";
import Form from "./component/Form/Form";
import Home from "./component/Home/Home.jsx";
import Detail from "./component/Detail/Detail";
import Favorites from "./component/Favorites/Favorites";
import LandingPage from "./component/landingPage/LandingPage";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/favorites" component={Favorites} />
    </div>
  );
}

export default App;
