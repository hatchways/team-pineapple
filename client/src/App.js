import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';

import LogIn from './pages/LogIn.js';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';
import NotFound from './pages/NotFound.js';

import PostDialog from './components/Dialog/PostDialog/PostDialog';
import BoardDialog from './components/Dialog/BoardDialog/BoardDialog';
import InterestQuiz from './components/InterestQuiz.js'

import './App.css';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/signup' component={SignUp} />
                <Route path='/profile/:username' component={Profile} />
                <Route path='/profile/:username/post/create' component={PostDialog} />
                <Route path='/profile/:username/board/create' component={BoardDialog} />
                <Route path='/profile/:username/interestquiz' component={InterestQuiz} />
                <Route component = {NotFound} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
