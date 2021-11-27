import * as React from 'react';
import BasicMenu from './BasicMenu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ButtonAppBar() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['username']);

    const handleLogout = () => {
        removeCookie('username');
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: '#1976d2' }}>
                    <BasicMenu />
                    <Typography style={{ color: 'white' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Workout Buddy
                    </Typography>
                    <Button onClick={handleLogout} style={{ color: 'white', backgroundColor: '#3f51b5' }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}