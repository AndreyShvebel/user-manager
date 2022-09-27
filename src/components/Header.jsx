import { AppBar, Avatar, Button, Container, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authorizeUserSlice';

const LinkButton = (props) => {
    return <Button
        component={Link}
        {...props}
    />
}

const Header = () => {
    const { userToken } = useSelector(state => state.authorizeUser)
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()

    const handleLogoutClick = () => {
        dispatch(logout())
    }

    return (
        <>
            <AppBar >
                <Toolbar >
                    {
                        isMatch
                            ?
                            <>
                                <Typography component={NavLink} to='/' sx={{ textDecoration: 'none', color: 'white' }} >Users Dashboard</Typography>
                                {!userToken && <LinkButton variant='contained' sx={{ ml: 'auto' }} to='/login' > Sign In </LinkButton>}
                                <DrawerComponent />
                            </>
                            :
                            <>
                                <Typography component={NavLink} to='/' sx={{ textDecoration: 'none', color: 'white' }} >Users Dashboard</Typography>
                                <Typography component={NavLink} to='/users-list' sx={{ textDecoration: 'none', color: 'white', ml: 2 }}  >Users List</Typography>
                                {!userToken
                                    ?
                                    <Button component={Link} to='/login' variant='contained' sx={{ ml: 'auto' }} > Sign In </Button>
                                    :
                                    <>
                                        <Avatar sx={{ ml: 'auto' }} />
                                        <Button
                                            component={Link} 
                                            to='/' 
                                            variant='contained'
                                            sx={{ ml: 2 }}
                                            onClick={handleLogoutClick}
                                        >Log Out</Button>
                                    </>
                                }
                            </>
                    }
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 10 }} >
                <Outlet />
            </Container>
        </>
    )
}

export default Header
