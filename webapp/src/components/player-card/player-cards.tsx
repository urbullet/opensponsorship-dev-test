import * as React from 'react';
import {Container} from '@mui/material';
import PlayerCard from "./player-card";
import {Player} from "../../types/player";

export const PlayerCards = ({players}: { players: Player[] }) => {
    return <Container component="main" sx={{m: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {
            players.map(player => {
                return <PlayerCard key={player.id} player={player}/>
            })
        }
    </Container>
}
