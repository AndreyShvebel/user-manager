import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../store/slices/getUserByIdSlice';
import { Box } from '@mui/system';
import { Avatar, Button, Checkbox, FormHelperText, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { modify } from '../store/slices/modifyUserSlice';

const EditUser = () => {
    const { id } = useParams()
    const { userInfo } = useSelector(state => state.getUserById)
    const { userToken } = useSelector(state => state.authorizeUser)
    const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'all' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const lastLogin = userInfo.last_login && new Date(userInfo.last_login)

    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        dispatch(getById({ id, userToken }))
    }, [])

    const onSubmit = (data) => {
        const newUserData = {}
        newUserData.id = id
        newUserData.username = data.username
        newUserData.password = data.password
        newUserData.first_name = data.firstName
        newUserData.last_name = data.lastName
        newUserData.userToken = userToken
        newUserData.is_active = data.isActive
        dispatch(modify(newUserData))
        navigate('/users-list')
    }


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: isMatch ? 'column' : 'row',
        }} >
            <Box sx={{ mb: isMatch && 2 }} >
                <Avatar
                    sx={{ width: 128, height: 128, mb: 2 }}
                />
                <Typography > Username: {userInfo.username} </Typography>
                <Typography > First name: {userInfo.first_name ? userInfo.first_name : <i >Not set</i>} </Typography>
                <Typography > Last name: {userInfo.last_name ? userInfo.last_name : <i >Not set</i>} </Typography>
                <Typography > Last login: {lastLogin?.toString() ? lastLogin?.toString() : <i>No data</i>} </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }} >
                <Typography variant='h5' sx={{ mb: 3 }} >Edit {userInfo.username} User data</Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <TextField label='New username'
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
                    <TextField type='password' label='New password'
                        {...register(
                            'password',
                            {
                                required: 'Password is required'
                            }
                        )} ></TextField>
                    <FormHelperText sx={{ mb: 2, color: 'error.main' }} >{errors.password?.message}</FormHelperText>
                    <TextField type='password' label='Repeat password'
                        {...register(
                            'repeatPassword',
                            {
                                required: 'Password is required',
                                validate: value => {
                                    if (watch('password') !== value) {
                                        return 'Passwords do no match'
                                    }
                                }
                            }
                        )} ></TextField>
                    <FormHelperText sx={{ mb: 2, color: 'error.main' }} >{errors.repeatPassword?.message}</FormHelperText>
                    <TextField label='First name'{...register('firstName')} ></TextField>
                    <FormHelperText sx={{ mb: 2, color: 'error.main' }} >{errors.firstName?.message}</FormHelperText>
                    <TextField label='Last name'{...register('lastName')} ></TextField>
                    <FormHelperText sx={{ mb: 2, color: 'error.main' }} >{errors.lastName?.message}</FormHelperText>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }} >

                        <Typography >User active</Typography>
                        <Checkbox defaultChecked label='is User active?'
                            {...register('isActive')}
                        />
                    </Box>

                    <Button variant='contained' type='submit' >Submit</Button>
                </form>
            </Box>
        </Box>
    )
}

export default EditUser
