import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModalDialogSignup from './components/ModalDialogSignup';
import ModalDialogLogin from './components/ModalDialogLogin';

export default function Home() {
    // declare a new state variable for modal open
    const [openSignup, setOpenSignup] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    // function to handle modal open
    const handleOpenSignup = () => {
        setOpenSignup(true);
    };
    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    // function to handle modal close
    const handleCloseSignup = () => {
        setOpenSignup(false);
    };
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    return (
        <div className="App">
            <img src={"/gym-heart.jpg"} alt="heart logo" />
            <p>
                Welcome to Workout Buddy!
            </p>
            <p>
                Your helpful friend to help you keep track of your favorite workouts and discover new ones!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '32px' }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleOpenSignup}>
                        Sign Up
                    </Button>
                    <ModalDialogSignup open={openSignup} handleClose={handleCloseSignup} />
                    <Button variant="contained" onClick={handleOpenLogin}>
                        Login
                    </Button>
                    <ModalDialogLogin open={openLogin} handleClose={handleCloseLogin} />
                </Stack>
            </div>
        </div>
    );
}