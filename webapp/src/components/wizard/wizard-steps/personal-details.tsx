import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {FormControl, MenuItem, Select} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {PlayerWizardContext} from "../player-form";
import {Gender} from "../../../types/player";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

export const PersonalDetails = () => {
    const {formInput, updateInput} = useContext(PlayerWizardContext);

    const [name, setName] = useState(formInput.name)
    const [gender, setGender] = useState(formInput.gender)
    const [location, setLocation] = useState(formInput.location)
    const [team, setTeam] = useState(formInput.team)
    const [dob, setDob] = useState(formInput.dateOfBirth)

    useEffect(() => {
        updateInput({name, gender, location, team, dateOfBirth: dob})
    },[name, gender, location, team, dob])
    const handleDateSelection = (value: Date | null) => {
        if (value !== null) {
            setDob(value)
        }
    }
    return <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                    label="Date of birth"
                    inputFormat="DD/MM/YYYY"
                    value={dob}
                    onChange={handleDateSelection}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        id="gender"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value as Gender)
                        }}>
                        {
                            Object.keys(Gender).map(gender => {
                                return <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="team"
                    label="Team"
                    type="team"
                    id="team"
                    value={team}
                    onChange={(e) => {
                        setTeam(e.target.value)
                    }}
                />
            </Grid>
        </LocalizationProvider>
    </>
}
