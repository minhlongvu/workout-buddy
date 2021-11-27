import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import ButtonAppBar from 'components/ButtonAppBar';
import { useParams } from 'react-router-dom';
import { Button, Divider, Stack } from '@mui/material';
import axios from 'axios';

export default function WorkoutDetails() {
    const [cookies, removeCookie] = useCookies(['username']);
    let { id } = useParams();

    const [exercise, setExercise] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [favorites, setFavorites] = useState([]);
    const [errorFavorites, setErrorFavorites] = useState("");
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    const [isFavorited, setIsFavorited] = useState(null);

    useEffect(() => {
        getExerciseById();
        getFavorites();
    }, []);

    useEffect(() => {
        console.log('changed isFavorited');
    }, [isFavorited]);

    useEffect(() => {
        filterFavorites();
    }, [favorites]);

    const getExerciseById = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/exercises/${id}`
            );
            setExercise(result.data);
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

    function filterFavorites() {
        const favIds = favorites.map(obj => {
            return obj.id;
        });
        const result = favIds.includes(parseInt(id));
        setIsFavorited(result);
    }

    function handleFavorite() {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/favorites`, {
            username: cookies.username, exerciseId: id
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    setIsFavorited(true);
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    function handleUnfavorite() {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/favorites/delete`, {
            data: {
                username: cookies.username,
                exerciseId: id
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setIsFavorited(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <ButtonAppBar />
            <h2>Workout Details</h2>
            {!cookies && <p>You are not logged in currently.</p>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {exercise && <h4>Showing details for workout of exercise ID: {exercise[0].exerciseid}</h4>}
                <Divider style={{ width: '75%' }} />
                {exercise && <h4>The name of the workout is: {exercise[0].exercisename}</h4>}
                <Divider style={{ width: '75%' }} />
                {exercise && <h4>Description: {exercise[0].description}</h4>}
                <Divider style={{ width: '75%', marginBottom: '32px' }} />
                {isFavorited ? (< p > This workout is currently favorited ♡.</p>) : (< p > This workout is not currently favorited.</p>)}
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" disabled={isFavorited ? true : false} onClick={handleFavorite} >
                        Favorite
                    </Button>
                    <Button variant="contained" color="error" disabled={isFavorited ? false : true} onClick={handleUnfavorite}>
                        Unfavorite
                    </Button>
                </Stack>
            </div>
        </div >
    )
}