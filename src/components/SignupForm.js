import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const SignupForm = ({ handleClose }) => {
    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['username']);

    const sendAccountPost = async (data) => {
        try {
            var config = {
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
            const resp = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/persons`, data, config);
            console.log(resp.data);
            // @ts-ignore
            setCookie('username', data.username, { path: '/' });
            navigate('/workouts');
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const onSubmit = data => {
        sendAccountPost(data);
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Username"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
                rules={{ required: 'Username required' }}
            />
            <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="First Name"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
                rules={{ required: 'First name required' }}
            />
            <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Last Name"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
                rules={{ required: 'Last name required' }}
            />
            <Controller
                name="pass"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Password"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="password"
                    />
                )}
                rules={{ required: 'Password required' }}
            />
            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </div>
        </form>
    );
};

export default SignupForm;