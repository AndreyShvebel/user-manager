import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { create } from '../store/slices/createUserSlice';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const { userToken } = useSelector(state => state.authorizeUser)
  const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'all' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const newUserData = {}
    newUserData.username = data.username
    newUserData.password = data.password
    newUserData.first_name = data.firstName
    newUserData.last_name = data.lastName
    newUserData.userToken = userToken
    newUserData.is_active = true
    dispatch(create(newUserData))
    navigate('/users-list')
  }


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }} >

      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }} >
        <Typography variant='h5' sx={{ mb: 3 }} >Create new user</Typography>
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
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be 8+ characters'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: 'Password should contain atleast 1 capital and 1 numeric'
                }
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
          <Button variant='contained' type='submit' >Submit</Button>
        </form>
      </Box>
    </Box>
  )
}

export default CreateUser
