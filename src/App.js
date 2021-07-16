import 'bootstrap/dist/css/bootstrap.min.css';
import { TheLayout } from './container';
import { Home, Login } from './view';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './app.css';


const App = () => {
  
  let userData = JSON.parse(localStorage.getItem("user"));
  
  return (
    <Router>
      <Switch>
        <Route exact path="/404">
          <div>404</div>
        </Route>
        {userData===null?(<Route exact path="/home" component={()=>( <Login/>)}/>):
        (<Route exact path="/home" component={()=>( !userData.isLoggedIn ? <Login warning="Hatalı giriş yaptınız."/>:<TheLayout/>)}/>)}
        
        {userData===null?(<Route exact path="/login" component={()=>( <Login/>)}/>):
        (<Route exact path="/login" component={()=>( !userData.isLoggedIn ? <Login warning="Hatalı giriş yaptınız."/>:<TheLayout/>)}/>)}

        {/* <Redirect from="*" to="/login" /> */}
      </Switch>
    </Router>
  );
}

export default App;
