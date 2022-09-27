import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ascendingSort, descendingSort, getUsersList, search } from '../store/slices/getUsersListSlice'
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const { userToken } = useSelector(state => state.authorizeUser)
    const { usersList } = useSelector(state => state.getUsersList)
    const dispatch = useDispatch()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, usersList.length - page * rowsPerPage)

    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleAscendingSort = () => {
        dispatch(ascendingSort())
    }

    const handleDescendingSort = () => {
        dispatch(descendingSort())
    }

    const handleSearch = (event) => {
        dispatch(search(event.target.value))
    }

    useEffect(() => {
        if (userToken) {
            dispatch(getUsersList(userToken))
        }
    }, [dispatch, userToken])

    return (
        <>
            {userToken ?
                <>
                    <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2
                        }}>
                        <Typography sx={{ mr: 2 }} >Start typing Username to search</Typography>
                        <TextField label='Search...' onChange={handleSearch} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        flexDirection: isMatch ? 'column' : 'row'
                    }} >
                        <Box sx={{
                            display: 'flex',
                        alignItems: 'center',

                        }}>                        
                        <Typography >Sort by ID:</Typography>
                        <ButtonGroup variant="text" size='small' >
                            <Button endIcon={<ArrowUpwardIcon />} onClick={handleAscendingSort} >Ascending</Button>
                            <Button endIcon={<ArrowDownwardIcon />} onClick={handleDescendingSort} >Descending</Button>
                        </ButtonGroup>
                        </Box>

                        <Button component={Link} to='../create-user' variant='contained' >Create new user</Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">First Name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    {!isMatch && <TableCell align="right">Is Active</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="right" >
                                                    <Typography component={Link} to={`../edit-user/${row.id}`} sx={{ textDecoration: 'none' }} >
                                                        {row.username}
                                                        <EditIcon fontSize='small' sx={{ ml: 1 }} />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">{row.first_name}</TableCell>
                                                <TableCell align="right">{row.last_name}</TableCell>
                                                {!isMatch && <TableCell align="right">{row.is_active ? 'Active' : 'Inactive'}</TableCell>}
                                            </TableRow>
                                        )
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={usersList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ width: '100%' }}
                        />
                    </TableContainer>
                </>
                :
                <Typography >You don't have a permission. Sign In to access Users List</Typography>
            }
        </>
    )
}

export default UsersList