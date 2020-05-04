import React, {Suspense} from 'react';
import Auth from '../hoc/auth';
import { Switch, Route } from "react-router-dom";
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import NavBar from './views/NavBar';
import RegisterPage from './views/RegisterPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>

    </Suspense>
  );
}

export default App;
