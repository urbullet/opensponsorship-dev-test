import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Player} from '../../types/player';
import {getImage} from "../../services/image-service";


export default function PlayerCard({player}: { player: Player }) {

    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        getImage(player.profilePicture).then(data => {
            const base64String = _arrayBufferToBase64(data);
            setImageUrl('data:image/jpeg;base64, ' + base64String)
        })
    }, [])

    function _arrayBufferToBase64(buffer: Buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const calculateAge = (date: Date) => {
        const today = new Date();
        const dateOfBirth = new Date(date)
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        const month = today.getMonth() - dateOfBirth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <Card sx={{m: 1, width: '31%', flexWrap: 'wrap', justifyContent: 'center'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src={imageUrl}
                    alt="profile image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {player.name}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>{calculateAge(player.dateOfBirth)}, {player.gender}</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>{player.location}</strong>
                                <br/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>{player.team}</strong>
                                <br/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Sports</strong>
                                <br/>
                                {player.sports.join(", ")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Interests</strong>
                                <br/>
                                {player.interests.join(', ')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>About</strong>
                                <br/>
                                {player.about}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
