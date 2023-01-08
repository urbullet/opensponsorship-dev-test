import React, {useContext, useEffect, useState} from "react";
import {PlayerWizardContext} from "../player-form";
import {Box, Button, Container, Grid, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import * as ImageService from "../../../services/image-service";
import {AxiosResponse} from "axios";

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
export const ProfilePicture = () => {
    const {formInput, updateInput} = useContext(PlayerWizardContext);
    const [profilePicture, setProfilePicture] = useState(formInput.profilePicture)
    const [currentFile, setCurrentFile] = useState({} as any)
    const [previewImage, setPreviewImage] = useState("")
    const [progress, setProgress] = useState(0)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        updateInput({profilePicture})
    }, [profilePicture])

    const selectFile = (event: any) => {
        setCurrentFile(event.target.files[0])
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
        setProgress(0)
        setMessage("")
        setProfilePicture("")
    }

    const upload = () => {
        setProgress(0)
        ImageService.upload(currentFile, (event: any) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        }).then((response: AxiosResponse<any>) => {
            setMessage(response.data.message)
            setProfilePicture(response.data)
            setIsError(false)
        }).catch((err) => {
            setIsError(true)
            setProgress(0)
            setMessage("Could not upload the image!")
            setCurrentFile("")
            setProfilePicture("")
            console.error(err)
        });
    }

    return <Container component="main" sx={{m: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Grid container spacing={2}>
            <Grid item xs={10}>
                <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="profile-picture"
                        style={{display: 'none'}}
                        type="file"
                        accept="image/*"
                        onChange={selectFile}/>
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span">
                        Choose Image
                    </Button>
                </label>
                <div className="file-name">
                    {currentFile ? currentFile.name : null}
                </div>
            </Grid>

            <Grid item xs={2}>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    disabled={!currentFile}
                    onClick={upload}>
                    Upload
                </Button>
            </Grid>


            {currentFile && (
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Box width="100%" mr={1}>
                            <LinearProgressWithLabel value={progress}/>
                        </Box>
                    </Box>
                </Grid>
            )}

            {previewImage && (
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <img className="" src={previewImage} alt="" width="250" height="250"/>
                    </Box>
                </Grid>
            )}

            {message && (
                <Grid item xs={12}>
                    <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                        {message}
                    </Typography>
                </Grid>
            )}
        </Grid>

    </Container>
}
