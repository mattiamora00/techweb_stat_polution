import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StatPageComp from './components/statPage/StatPage';
import HomeComp from './components/home/Home';
import Login from './components/login/Login';
import UserProfilePage from './components/home/UserPage';
import RegisterUser from './components/login/RegisterUser';

const Routes = (props) => (
    <BrowserRouter>
         <Switch>
            <Route exact path="/"  render={() => <Login  setClient={props.setClient} />}/>
            <Route exact path="/home" component={HomeComp} />
            <Route exact path="/statPage" component={StatPageComp} />
            <Route exact path="/userProfilePage" component={UserProfilePage} />
            <Route exact path="/registerUser" component={RegisterUser} />
         </Switch>
    </BrowserRouter>
);

export default Routes;