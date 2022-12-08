
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import Feed from '../pages/Feed';
import New from '../pages/New';
import Awards from '../pages/Awards';
import Informative from '../pages/Informative';

export default function Routes(){
  return(
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/awards" component={Awards} isPrivate />
      <Route exact path="/informative" component={Informative} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
      <Route exact path="/feed" component={Feed} isPrivate />
      <Route exact path="/new" component={New} isPrivate />
      <Route exact path="/new/:id" component={New} isPrivate />
      
    </Switch>
  )
}