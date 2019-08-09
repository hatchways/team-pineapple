import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';

import LogIn from './pages/Login';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';
import NotFound from './pages/NotFound.js';

import PostDialog from './components/Dialog/PostDialog/PostDialog';
import BoardDialog from './components/Dialog/BoardDialog/BoardDialog';
import InterestQuizDialog from './components/Dialog/InterestQuizDialog/QuizDialog';
import './App.css';
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
                        <Route exact path='/' component={LogIn}/>
                        <Route exact path='/signup' component={SignUp}/>
                    </Switch>
                    <Route exact path='/interest-quiz' component={InterestQuizDialog}/>
                    <Route path='/profile/:username' component={Profile}/>
                    <Route path='/profile/:username/post/create' component={PostDialog}/>
                    <Route path='/profile/:username/board/create' component={BoardDialog}/>
                    <Route path='/post/:id' component={PostPage}/>
                    <Route exact path='/' component={NotFound}/>
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
