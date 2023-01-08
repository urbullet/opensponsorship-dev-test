import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from "@mui/material/Typography";

export const WizardHeader = ({title, steps, activeStep}: { title: string, steps: string[], activeStep: number }) => {
    return (
        <>
            <Typography component="h3" variant="h5">
                {title}
            </Typography>
            <Box sx={{width: '100%', m: 2}}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    );
}
