import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SignupForm from './SignupForm';

const ModalDialogSignup = ({ open, handleClose }) => {
    return (
        // props received from App.js
        <Dialog open={open} onClose={handleClose}>
            <SignupForm handleClose={handleClose} />
        </Dialog>
    );
};

export default ModalDialogSignup;