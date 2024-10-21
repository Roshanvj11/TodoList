import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { io } from 'socket.io-client';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function UpdateTodo({ id, setDateValue }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [inputData, setInputData] = React.useState([]);
    const [timeData, setTimeData] = React.useState([]);
    const socket = io('http://localhost:5000');

    // console.log('id', id)
    console.log('setDateValue', setDateValue)
    console.log('inputData', inputData);
    console.log('timeData', timeData)



    React.useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data for ID:', id); // Add this log to check the ID
            try {
                const response = await axios.get(`http://localhost:5000/api/user/getData/${id}`)
                console.log('response.data', response.data)
                setInputData(response.data[0].Task)
                setTimeData(response.data[0].Time)
            } catch (error) {
                console.error("Error getting data:", error);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [id])

    const handleClose = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/user/updateGetData/${id}`, { newData: inputData, time: timeData });
            console.log('response.data', response.data);
            // Emit a statusUpdated event through Socket.IO
            socket.emit('statusUpdated', { id, newData: inputData, time: timeData });
            setOpen(false);
        } catch (error) {
            console.error("Error updating input data:", error);
        }
    };


    return (
        <React.Fragment>
            <EditIcon sx={{
                color: 'purple',
                fontSize: "30px",
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                    color: 'blue',
                    transform: 'scale(1.2)'
                }
            }} onClick={handleClickOpen} />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Notes
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        id="outlined-basic"
                        label="Task"
                        value={inputData}
                        fullWidth
                        onChange={(e) => setInputData(e.target.value)}
                        variant="outlined" />


                    <TextField
                        required
                        margin="dense"
                        id="time"
                        name="time"
                        label="Time"
                        type="time"
                        value={timeData}
                        onChange={(e) => setTimeData(e.target.value)}
                        fullWidth
                        variant="outlined"
                        focused
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    )
}
