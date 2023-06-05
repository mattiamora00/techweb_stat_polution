import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StatPageComp from './components/StatPage';
import HomeComp from './components/Home';
import Login from './components/Login';

const Routes = (props) => (
    <BrowserRouter>
         <Switch>
            <Route exact path="/"  render={() => <Login  setClient={props.setClient} />}/>
            <Route exact path="/home" component={HomeComp} />
            <Route exact path="/statPage" component={StatPageComp} />
         </Switch>
    </BrowserRouter>
);

export default Routes;