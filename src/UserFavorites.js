import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import ButtonAppBar from 'components/ButtonAppBar';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserFavorites() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['username']);

    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [favorites, setFavorites] = useState([]);
    const [errorFavorites, setErrorFavorites] = useState("");
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    const [favoriteExercises, setFavoriteExercises] = useState([]);

    useEffect(() => {
        getExercises();
        getFavorites();
    }, []);

    useEffect(() => {
        getFavoriteExercises();
    }, [favorites, exercises]);

    const getExercises = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/exercises`
            );
            let data = result.data;
            let updatedData = data.map(obj => {
                return {
                    "id": obj.exerciseid,
                    "exerciseName": obj.exercisename,
                }
            })
            setExercises(updatedData);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const getFavorites = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/favorites/${cookies.username}`
            );
            let data = result.data;
            let updatedData = data.map(obj => {
                return {
                    "id": obj.exerciseid,
                }
            })
            setFavorites(updatedData);
        } catch (err) {
            setErrorFavorites(err.message || "Unexpected Error!");
        } finally {
            setLoadingFavorites(false);
        }
    };

    function getFavoriteExercises() {
        const favIds = favorites.map(obj => {
            return obj.id;
        });
        const result = exercises.filter(exercise => favIds.includes(exercise.id));
        setFavoriteExercises(result);
    }

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };

    const columns = [
        { field: 'id', headerName: 'Exercise ID', width: 150 },
        { field: 'exerciseName', headerName: 'Exercise Name', width: 500 },
        {
            field: 'view',
            headerName: '',
            width: 98,
            renderCell: (cellValues) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={(event) => { handleCellClick(cellValues, event); navigate(`/details/${cellValues.id}`) }}
                    >
                        Open
                    </Button>
                </strong >
            )
        },
    ];

    return (
        <div>
            <ButtonAppBar />
            <h2>User Favorites</h2>
            {!cookies && <p>You are not logged in currently.</p>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ height: 320, width: 750 }}>
                    <DataGrid rows={favoriteExercises} columns={columns} autoPageSize />
                </div>
            </div>
        </div>
    )
}


