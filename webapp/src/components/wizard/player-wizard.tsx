import React from "react";
import {PersonalDetails} from "./wizard-steps/personal-details";
import {Sports} from "./wizard-steps/sports-and-interests";
import {About} from "./wizard-steps/about";
import {ProfilePicture} from "./wizard-steps/profile-picture";

export const PlayerWizard = ({activeStep}: { activeStep: number }) => {
    const renderCurrentStep = () => {
        switch (activeStep) {
            case 0:
                return <PersonalDetails/>
            case 1:
                return <Sports/>
            case 2:
                return <About/>
            case 3:
                return <ProfilePicture/>
            default:
                return null;
            // case 4: return <ProfilePicture/>
        }
    }
    return renderCurrentStep()
}
