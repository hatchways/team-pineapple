import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';
import './App.css';

import Home from './pages/Home';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';

import NotFound from './pages/NotFound.js';
import PostPage from './pages/Post/PostPage';
import { getToken } from './actions/userActions';

class App extends Component {
    componentDidMount () {
        this.props.getToken();
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' component={Home} />
                        <Route path='/post/:id' component={PostPage} />
                        <Route path='/profile/:username' component={Profile} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route path='/' component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getToken
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(App);
