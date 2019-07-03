import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import NewScat from '../components/NewScat/NewScat';
import EditScat from '../components/EditScat/EditScat';
import SingleScat from '../components/SingleScat/SingleScat';
import MyNavbar from '../components/MyNavbar/MyNavbar';

import './App.scss';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className='container'>
              <div className="row">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed}/>
                  <PrivateRoute path='/home' component={Home} authed={authed}/>

                  <PrivateRoute path='/new' component={NewScat} authed={authed}/>
                  <PrivateRoute path='/edit/:id' component={EditScat} authed={authed}/>
                  <PrivateRoute path='/scat/:id' component={SingleScat} authed={authed}/>

                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
