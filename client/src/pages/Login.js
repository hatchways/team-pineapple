import React, {useState} from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { styles } from './auth-styles';
import { Paper, TextField, withStyles } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/userActions';

const Login = ({classes, userStore, login}) => {
    let [email, postEmail] = useState('');
    let [pass, postPass] = useState('');

    const handleChangePass = (e) => {
        postPass(pass = e.target.value);
    };
    
    const handleChangeEmail = (e) => {
        postEmail(email = e.target.value);
    };

    const postInfo = () => {
        login({email, password:pass});
    };

    if(userStore.authenticated) {
        return (<Redirect to={'/profile/'+userStore.user.username} />);
    }

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.grid}>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                    <Paper className={classes.card}>
                    </Paper>
                </div>
            </div>
            <div className={classes.signin}>
                <div className={classes.modal}>
                    <h1 className={classes.welcome}>Welcome!</h1>
                    <div className={classes.emailContainer}>
                        <TextField label='E-mail' className={classes.inputemail} onChange={handleChangeEmail}/>
                    </div>
                    <div className={classes.passContainer}>
                        <TextField label='Password' type="password" className={classes.inputpass} onChange={handleChangePass}/>
                    </div>
                    <p className={classes.forgotpass}>Forgot your password?</p>
                    <button className={classes.loginbutton} onClick={postInfo}>Login</button>
                    <p className={classes.footer}>Don't have an account? <Link to='/signup' className={classes.signup}>Sign Up!</Link></p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            login
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Login);