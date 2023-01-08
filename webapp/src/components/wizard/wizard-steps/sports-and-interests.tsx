import React, {useContext, useEffect, useState} from 'react';
import {FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import {PlayerWizardContext} from "../player-form";
import TextField from "@mui/material/TextField";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SportsAndInterests = [
    "Golf",
    "Tennis",
    "Cricket",
    "Basketball",
    "Baseball",
    "American Football",
    "Aquatics",
    "Archery",
    "Automobile Racing",
    "Badminton",
    "Beach Volleyball",
    "Bobsleigh",
    "Body Building",
    "Boxing",
    "Cross Country Running",
    "Cross Country Skiing",
    "Curling",
    "Cycling",
    "Darts",
    "Decathlon",
    "Down Hill Skiing",
    "Equestrianism",
    "eSports",
    "Fencing",
    "Field Hockey",
    "Figure Skating",
    "Gymnastics",
    "Ice Hockey",
    "Martial Arts",
    "Mixed Martial Arts",
    "Modern Pentathlon",
    "Motorcycle Racing",
    "Netball",
    "Polo",
    "Racquetball",
    "Rowing",
    "Rugby",
    "Sailing",
    "Softball",
    "Shooting",
    "Skateboarding",
    "Skeet Shooting",
    "Skeleton",
    "Snow Boarding",
    "Soccer (Football)",
    "Squash",
    "Surfing",
    "Swimming",
    "Track and Field",
]
export const Sports = () => {
    const {formInput, updateInput} = useContext(PlayerWizardContext);
    const [sports, setSports] = useState(formInput.sports)
    const [interests, setInterests] = useState(formInput.interests)

    useEffect(() => {
        updateInput({sports, interests})
    }, [sports, interests])

    const handleChange = (event: SelectChangeEvent<typeof sports>) => {
        const {
            target: {value},
        } = event;
        setSports(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return <>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="sports">Sports</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={sports}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Sports"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {SportsAndInterests.map((sport) => (
                        <MenuItem key={sport} value={sport}>
                            <Checkbox checked={sports.indexOf(sport) > -1}/>
                            <ListItemText primary={sport}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="interests"
                label="Interests (comma separated)"
                type="interests"
                id="interests"
                value={interests.join(', ')}
                onChange={(e) => {
                    setInterests(e.target.value.split(',').map(interest => interest.trim()))
                }}
            />
        </Grid>

    </>
}
