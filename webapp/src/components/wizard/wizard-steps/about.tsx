import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {PlayerWizardContext} from "../player-form";

export const About = () => {
    const {formInput, updateInput} = useContext(PlayerWizardContext);
    const [about, setAbout] = useState(formInput.about)

    useEffect(() => {
        updateInput({about})
    }, [about])

    return <>
        <Grid item xs={12}>
            <TextField
                fullWidth
                required
                multiline
                rows={3}
                name="about"
                label="About"
                type="about"
                id="about"
                value={about}
                onChange={(e) => {setAbout(e.target.value)}}

            />
        </Grid>
    </>
}
