import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Divider from '@mui/material/Divider';
import ButtonAppBar from 'components/ButtonAppBar';
import axios from 'axios';

export default function UserProfile() {
    const [cookies, removeCookie] = useCookies(['username']);

    const [info, setInfo] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAccountInfo();
    }, []);

    const getAccountInfo = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/persons/${cookies.username}`
            );
            setInfo(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ButtonAppBar />
            <h2>Account Information</h2>
            {!cookies && <p>You are not logged in currently.</p>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {info && <h4>Your username is: {info[0].username}</h4>}
                <Divider style={{ width: '75%' }} />
                {info && <h4>Your first name is: {info[0].firstname}</h4>}
                <Divider style={{ width: '75%' }} />
                {info && <h4>Your last name is: {info[0].lastname}</h4>}
                <Divider style={{ width: '75%' }} />
            </div>
        </div>
    )
}