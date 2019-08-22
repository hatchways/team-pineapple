import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/Dialog/SignUp/SignUpForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import './stylesheet/SignUp.css';
const useStyles = makeStyles({
    container: {
        display: 'grid',
        justifyItems: 'center',
        zIndex: '0'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '15px',
        justifyItems: 'center'
    },
    card: {
        height: '55vh',
        width: '18vw',
        background: 'yellow'
    },
    signin: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '1',
        position: 'fixed',
        left: '0px',
        top: '0px',
        height: '100vh',
        width: '100vw',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        width: '35vw',
        height: '90vh',
        borderRadius: '15px',
        textAlign: 'center'
    },
    inputContainer: {
        height: '13vh',
        minWidth: '22vw',
        padding: '0',
        margin: '0'
    },
    input: {
        width: '22vw',
        marginTop: '10px',
        '& label': {
            fontWeight: 'bold',
            color: 'black'
        }
    },
    welcome: {
        marginBottom: '0'
    },
    signupbutton: {
        border: '1px solid lightgrey',
        backgroundColor: 'white',
        padding: '10px 50px 10px 50px',
        margin: '0 auto',
        marginTop: '20px',
        borderRadius: '50px',
        fontWeight: 'bold',
        display: 'block',
        '&:hover': {
            backgroundColor: 'lightblue',
            color: 'white',
            cursor: 'pointer'
        }
    },
    footer: {
        borderTop: '1px solid lightgrey',
        paddingTop: '20px',
        marginTop: '35px',
        fontSize: '14px'
    },
    login: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    }
});

// eslint-disable-next-line react/prop-types
const SignUp = ({ history }) => {
    const style = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        passwordError: ''
    });
    const { email, username, password, password2, passwordError } = formData;

    const onChangeText = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const postInfo = async () => {
        if (password !== password2) {
            setFormData({ ...formData, passwordError: 'Passwords do not match' });
        }

        // TODO: Fix Signup (fix password validation as well)
        if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@!%*?&].{8,}/)) {
            setFormData({
                ...formData,
                passwordError:
                    'Password must contain at least 8 characters and one Lower Case and one Upper Case and 3 Numbers'
            });
        } else {
            try {
                const body = {
                    username,
                    name: username,
                    email,
                    password
                };
                const config = {
                    'Content-Type': 'application/json'
                };
                await axios.post('/users/register', body, config);
                history.push(`/profile/${username}`);
            } catch (err) {
                console.log('Something went wrong with the registration');
            }
        }
    };

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ textAlign: 'center' }}>Welecome!</DialogTitle>
            <DialogContent>
                <div className="Content">
                    <SignUpForm
                        onChangeText={onChangeText}
                        username={username}
                        email={email}
                        // name={name}
                        password={password}
                        password2={password2}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={postInfo} color="primary" className="create">
                    Sign Up!
                </Button>
            </DialogActions>

            <p className={style.footer} style={{ textAlign: 'center' }}>
                Already a Member?{' '}
                <Link to="/login" className={style.login}>
                    Log In!
                </Link>
            </p>
        </Dialog>
    );
};

export default SignUp;
