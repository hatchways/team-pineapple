import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';
import '../../../pages/stylesheet/SignUp.css';

const SignUpForm = ({ name, username, email, password, password2, passwordError, onChangeText }) => {
    return (
        <div className = 'Content'>
            <TextField
                label="Name"
                name="name"
                value={name}
                onChange={e => onChangeText(e)}
            />

            <TextField
                label="Username"
                name="username"
                value={username}
                onChange={e => onChangeText(e)}
            />

            <TextField
                label="E-mail"
                name="email"
                value={email}
                onChange={e => onChangeText(e)}
            />

            {/* <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => onChangeText(e)}
                error={Boolean(passwordError)}
                helperText={passwordError}
            />

            <TextField
                label="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={e => onChangeText(e)}
            /> */}
        </div>
    );
};

export default SignUpForm;
