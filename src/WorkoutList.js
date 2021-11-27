import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid';
import ButtonAppBar from 'components/ButtonAppBar';
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function WorkoutList() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['username']);

    // To reload once to make sure styling is there
    window.onload = function () {
        if (!window.location.hash) {
            // @ts-ignore
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    // Start of stuff needed for GET request for exercise list
    const [exercises, setExercises] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // @ts-ignore
        window.onload();
        getExercises();
    }, []);

    const getExercises = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/exercises`
            );
            let data = result.data;
            console.log(data);
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
    // End of stuff needed for GET request for exercise list

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
            <h2>Workout List</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ height: 320, width: 750 }}>
                    <DataGrid rows={exercises} columns={columns} autoPageSize />
                </div>
            </div>
        </div>
    )
}