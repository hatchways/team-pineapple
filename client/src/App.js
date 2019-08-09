import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';
import './App.css';

import Home from './pages/Home';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';
import NotFound from './pages/NotFound.js';
import PostPage from './pages/Post/PostPage';

import Login from './components/Dialog/Login/Login';
import PostDialog from './components/Dialog/PostDialog/PostDialog';
import BoardDialog from './components/Dialog/BoardDialog/BoardDialog';
import InterestQuizDialog from './components/Dialog/InterestQuizDialog/QuizDialog';

function App () {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/post/:id' component={PostPage} />
                    <Route path='/profile/:username' component={Profile} />
                    <Route exact path='/' component={NotFound} />
                </Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/interest-quiz' component={InterestQuizDialog} />
                <Route path='/profile/:username/post/create' component={PostDialog} />
                <Route path='/profile/:username/board/create' component={BoardDialog} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
