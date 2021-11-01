import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../features_app/auth/login/Login'

function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute;
