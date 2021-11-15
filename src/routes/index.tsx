import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Forgot from '../features_app/auth/forgot/Forgot';
import Login from '../features_app/auth/login/Login'
import Register from '../features_app/auth/register/Register';
import AccountPage from '../features_app/dashboard/account/AccountPage';
import BuyerLists from '../features_app/dashboard/buyer_lists/BuyerLists';
import ChatPage from '../features_app/dashboard/chat/ChatPage';
import CustomRole from '../features_app/dashboard/custom_role/CustomRole';
import DetailCustomRole from '../features_app/dashboard/custom_role/DetailCustomRole';
import FinancePage from '../features_app/dashboard/finance/FinancePage';
import HomeDashboard from '../features_app/dashboard/home/HomeDashboard';
import OrdersPage from '../features_app/dashboard/orders/OrdersPage';
import ProductsPage from '../features_app/dashboard/products/ProductsPage';
import ProfilePage from '../features_app/dashboard/profile/ProfilePage';
import StepRegister from '../features_app/dashboard/step_register/StepRegister';
import TeamsPage from '../features_app/dashboard/teams/TeamsPage';
import Error404 from '../features_app/error404/Error404';
import DashboardLayout from '../utilities/DashboardLayout';

function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={Forgot} />
          <DashboardLayout exact path="/register/step" component={StepRegister} />
          <DashboardLayout exact path="/dashboard" component={HomeDashboard} />
          <DashboardLayout exact path="/dashboard/orders" component={OrdersPage} />
          <DashboardLayout exact path="/dashboard/teams" component={TeamsPage} />
          <DashboardLayout exact path="/dashboard/products" component={ProductsPage} />
          <DashboardLayout exact path="/dashboard/profile" component={ProfilePage} />
          <DashboardLayout exact path="/dashboard/custom-role" component={CustomRole} />
          <DashboardLayout exact path="/dashboard/custom-role/:id" component={DetailCustomRole} />
          <DashboardLayout exact path="/dashboard/account" component={AccountPage} />
          <DashboardLayout exact path="/dashboard/finance" component={FinancePage} />
          <DashboardLayout exact path="/dashboard/message" component={ChatPage} />
          <DashboardLayout exact path="/dashboard/buyer-list" component={BuyerLists} />
          <Route exact path="*" component={Error404} />

        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute;
