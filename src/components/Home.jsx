import { Box, ListItem, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Box >
      <div>
      <Typography variant='h3' >User Manager</Typography>
      <Typography variant='caption' > This Dashboard is created to manage users </Typography>
      </div>
      <Typography variant='overline' >Features:</Typography>
      <ListItem sx={{ display: 'list-item' }} >Overview users list</ListItem>
      <ListItem sx={{ display: 'list-item' }} >Sort users list by user ID</ListItem>
      <ListItem sx={{ display: 'list-item' }} >Search user by username</ListItem>
      <ListItem sx={{ display: 'list-item' }} >Create new user</ListItem>
      <ListItem sx={{ display: 'list-item' }} >Edit existing user</ListItem>
      <Typography variant='h5' >Please, sign in to access all features</Typography>
    </Box>
  )
}

export default Home