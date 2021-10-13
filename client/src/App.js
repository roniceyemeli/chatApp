import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from "./pages/login/Login"
import Register from './pages/register/Register';
import Messenger from './pages/messenger/Messenger';
import RealTime from './pages/messenger/RealTime';
import Home from './pages/home/Home';


const App = () =>{

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path= "/register" exact component={Register}/>
          <Route path= "/login" exact component={Login}/>
          <Route path=  "/messenger" exact component={Messenger}/>
          <Route path=  "/realtime" exact component={RealTime}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
