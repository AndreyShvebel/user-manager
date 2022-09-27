import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { authorizeUser } from "../store/slices/authorizeUserSlice";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        dispatch(authorizeUser(data))
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }} >
                <Typography variant='h6' sx={{ mb: 2 }} >Type in your data to sign in</Typography>
                <TextField label='Username'
                    {...register(
                        'username',
                        {
                            required: 'Username is required',
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters long'
                            }
                        }
                    )} ></TextField>
                <FormHelperText sx={{ mb: 2, color: 'error.main' }} >{errors.username?.message}</FormHelperText>
                <TextField type='password' label='Password'
                    {...register(
                        'password',
                        {
                            required: 'Password is required'
                        }
                    )} ></TextField>
                <FormHelperText sx={{ mb: 2, color: 'error.main' }} >{errors.password?.message}</FormHelperText>
                <Button variant='contained' type='submit' >Sign in</Button>
            </Box>
        </form>
    );
}

export default Login
