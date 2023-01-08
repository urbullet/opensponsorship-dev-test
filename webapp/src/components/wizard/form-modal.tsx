import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {PlayerForm} from "./player-form";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '75%',
    minHeight: '75%',
    maxHeight: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: "scroll"
};

export const FormModal = ({refreshPlayersList}: {refreshPlayersList: Function}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        refreshPlayersList()
    }

    return (
        <>
            <Button variant="contained" sx={{width: '50%', alignContent: 'center'}} onClick={handleOpen}>
                Add new player
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <PlayerForm handleClose={handleClose}/>
                </Box>
            </Modal>
        </>
    );
}
