import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Claims from './components/Example';
import Navbar from './components/Navbar';
import AdminDashboard from './components/pages/AdminDashboard';
import Admit from './components/pages/Admit';
import Cashless from './components/pages/Cashless';
import ClaimList from './components/pages/ClaimList';
import Claimfy from './components/pages/Claimsubmission_emp';
import Customer from './components/pages/Customer';
import CustomerDashboard from './components/pages/CustomerDashboard';
import Emply from './components/pages/Emply';
import Forgot from './components/pages/Forgot';
import Home from './components/pages/Home';
import HosList from './components/pages/HosList';
import HospitalList from './components/pages/HospitalList';
import Login from './components/pages/Login';
import PolicyList from './components/pages/PolicyList';
import Products from './components/pages/Products';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import TPA from './components/pages/TPADashboard';
import UserList from './components/pages/UserList';
import Userclaim from './components/pages/Userclaim';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/emply' component={Emply} />
          <Route path='/forgot' component={Forgot} />
          <Route path='/claimfy' component={Claimfy} />
          <Route path='/example' component={Claims} />
          <Route path='/admit' component={Admit} />
          <Route path="/claimlist" component={ClaimList} />
          <Route path="/policylist" component={PolicyList} />
          <Route path="/hospitallist" component={HospitalList} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/customer" component={Customer} />
          <Route path="/customerdash" component={CustomerDashboard} />
          <Route path="/tpa" component={TPA} />
          <Route path="/user" component={UserList} />
          <Route path="/hos" component={HosList} />
          <Route path="/userclaim" component={Userclaim} />
          <Route path="/cashless" component={Cashless} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
