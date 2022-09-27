import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const { userToken } = useSelector(state => state.authorizeUser)

    return (
        <>
            <Drawer open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List >
                    <ListItemButton >
                        <ListItemIcon >
                            <ListItemText >
                                <Typography
                                    onClick={() => setOpenDrawer(false)}
                                    component={Link}
                                    to='/'
                                    sx={{ textDecoration: 'none', color: 'black' }}
                                >Users Dashboard</Typography>
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    {
                        userToken &&
                        <ListItemButton >
                            <ListItemIcon >
                                <ListItemText >
                                    <Typography
                                        onClick={() => setOpenDrawer(false)}
                                        component={Link}
                                        to='/users-list'
                                        sx={{ textDecoration: 'none', color: 'black', ml: 2 }}
                                    >Users List</Typography>
                                </ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    }
                </List>
            </Drawer>
            <IconButton sx={{ ml: 'auto', color: 'inherit' }} onClick={() => setOpenDrawer(!openDrawer)} >
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default DrawerComponent
