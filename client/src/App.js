import './App.css';
import Form from './component/form/form';
import { Route } from 'react-router-dom';
import Home from './component/home/home.jsx';
import LandingPage from './component/landingPage/landingPage';
import Detail from './component/detail/detail';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <LandingPage />} />
      <Route exact path="/home" render={(match) => <Home match={match} />} />
      <Route exact path="/create" render={() => <Form />} />
      <Route exact path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
