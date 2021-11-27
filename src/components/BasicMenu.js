import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: 'white', backgroundColor: '#3f51b5' }}
            >
                Menu
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                style={{ flexDirection: 'column' }}
            >
                <MenuItem onClick={() => navigate('/profile', { replace: true })}>Account Info</MenuItem>
                <MenuItem onClick={() => navigate('/favorites', { replace: true })}>My Favorites</MenuItem>
                <MenuItem onClick={() => navigate('/workouts', { replace: true })}>Workout List</MenuItem>
            </Menu>
        </div >
    );
}