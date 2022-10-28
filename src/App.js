import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './template/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import Detail from './pages/Detail/Detail';
import { CheckoutTemplate } from './template/CheckoutTemplate/CheckoutTemplate';

import Checkout from './pages/Checkout/Checkout';
import { Suspense,lazy } from 'react';
import Profile from './pages/Profile/Profile';
import  AdminTemplate  from './template/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import Showtime from './pages/Admin/Showtime/Showtime';
import AddMovie from './pages/Admin/AddMovie/AddMovie';
import EditMovie from './pages/Admin/EditMovie/EditMovie';
// const CheckoutTemplateLazyload = lazy(()=> import ('./template/CheckoutTemplate/CheckoutTemplate'))
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path='/' exact Component={Home} />
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/detail/:id' exact Component={Detail} />
        <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/profile' exact component={Profile} />
        <AdminTemplate path='/admin' exact Component={Dashboard} />
        <AdminTemplate path='/admin/user' exact Component={Dashboard} />
        <AdminTemplate path='/admin/films' exact Component={Films} />
        <AdminTemplate path='/admin/showtime/:id' exact Component={Showtime} />
        <AdminTemplate path='/admin/films/addnew' exact Component={AddMovie} />
        <AdminTemplate path='/admin/films/edit/:id' exact Component={EditMovie} />
      </Switch>
    </Router>
  )
}

export default App;
