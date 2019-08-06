import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './Login.js';
import SignUp from './SignUp.js';
import Profile from './Profile.js';
// import Ping from "./Ping";
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';

const landinPageStyle = theme => ({
    landingContainer: {
        margin: theme.spacing.unit * 2
    }
});

class LandingPage extends Component {
  state = {
      placeholder: ''
  };

  render() {
      return (
          <div>
              <BrowserRouter>
                  <Route exact path='/' component={Login}/>
                  <Route exact path='/signup' component={SignUp}/>
                  <Route path='/profile/:username' component={Profile}/>
                  <Route exact path = "/profile/:username/post/create" component = {PostDialog}/>
                  <Route exact path = "/profile/:username/board/create" component = {BoardDialog}/>
              </BrowserRouter>        
          </div>
      );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
