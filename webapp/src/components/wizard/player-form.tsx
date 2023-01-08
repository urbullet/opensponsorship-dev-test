import React, {createContext, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {WizardHeader} from "./wizard-header";
import {PlayerWizard} from "./player-wizard";
import {Gender, Player} from "../../types/player";
import axios from "axios";


const theme = createTheme();

const steps = [
    'Personal details',
    'Sports & interests',
    'About',
    'Profile picture'
];

interface PlayerWizardContextInterface {
    formInput: Player,
    updateInput: Function
}

const defaultPlayerWizardContext: PlayerWizardContextInterface = {
    formInput: {
        id: "",
        name: "",
        dateOfBirth: new Date(),
        location: "",
        team: "",
        gender: Gender.Other,
        about: "",
        sports: [],
        interests: [],
        profilePicture: ""
    },
    updateInput: () => {
    }
};

export const PlayerWizardContext = createContext<PlayerWizardContextInterface>(defaultPlayerWizardContext);
export const PlayerForm = ({handleClose}: { handleClose: Function }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const [formInput, setFormInput] = useState(defaultPlayerWizardContext.formInput)
    const updateFormInput = (newInput: Player) => {
        setFormInput({
            ...formInput,
            ...newInput
        })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true)

        axios.post("http://localhost:8080/api/player", {
            ...formInput
        })
            .then(() => {
                handleClose()
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
                setSubmitting(false)
        });
    };
    const nextStep = () => {
        setActiveStep(activeStep + 1)
    }
    const previousStep = () => {
        setActiveStep(activeStep - 1)
    }

    const validateInput = () => {
        const {name, team, location, sports, interests, about, profilePicture} = formInput
        let missingFields = true
        switch (activeStep) {
            case 0:
                missingFields = name.trim().length > 0 && location.length > 0 && team.length > 0;
                break
            case 1:
                missingFields = sports.length > 0 && interests.length > 0;
                break
            case 2:
                missingFields = about.length > 10;
                break
            case 3:
                missingFields = profilePicture.length > 0
        }

        return !missingFields
    }

    return (
        <PlayerWizardContext.Provider value={{formInput, updateInput: updateFormInput}}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <WizardHeader title="Add new players" steps={steps} activeStep={activeStep}/>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3, width: '100%'}}>
                            <Grid container spacing={2}>
                                <PlayerWizard activeStep={activeStep}/>
                            </Grid>

                            <Grid
                                container
                                justifyContent={'space-between'}
                            >
                                <Grid item>
                                    <Button
                                        disabled={activeStep === 0 || submitting}
                                        onClick={previousStep}
                                        variant="contained"
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                {activeStep < steps.length - 1 && (
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={nextStep}
                                            disabled={validateInput()}
                                        >
                                            Next
                                        </Button>
                                    </Grid>
                                )}
                                {activeStep === steps.length - 1 && (
                                    <Grid item>
                                        <Button
                                            type={"submit"}
                                            color="primary"
                                            variant="contained"
                                            disabled={submitting || validateInput()}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>

                    </Box>
                </Container>
            </ThemeProvider>
        </PlayerWizardContext.Provider>
    );
}
