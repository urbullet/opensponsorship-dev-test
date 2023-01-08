import React, {useEffect, useState} from "react";
import {PlayerCards} from "./player-card/player-cards";
import {Player} from "../types/player";
import {Backdrop, Box, CircularProgress} from "@mui/material";
import {FormModal} from "./wizard/form-modal";
import CssBaseline from "@mui/material/CssBaseline";
import {getAllPlayers} from "../services/player-service";

export const Homepage = () => {
    const [allPlayers, setAllPlayers] = useState([] as Player[])
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState({})

    const refreshPlayersList = () => {
        setIsLoading(true)
        getAllPlayers().then((players) => {
            setAllPlayers(players)
        }).catch((error) => {
            console.error(error)
            setErrors({...errors, error})
        }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        refreshPlayersList();
    }, [])

    if (isLoading) {
        return <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
            // onClick={handleClose}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    }

    return (
        <>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <CssBaseline/>
                <FormModal refreshPlayersList={refreshPlayersList}/>
                <PlayerCards players={allPlayers}/>
            </Box>
        </>

    )
}
