import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm';

const ModalDialogLogin = ({ open, handleClose }) => {
    return (
        // props received from App.js
        <Dialog open={open} onClose={handleClose}>
            <LoginForm handleClose={handleClose} />
        </Dialog>
    );
};

export default ModalDialogLogin;