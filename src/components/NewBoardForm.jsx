import PropTypes from 'prop-types';
import { useState } from 'react';
import './NewBoardForm.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const NewBoardForm =({createNewBoard, isOpen, onClose}) => {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardOwner, setBoardOwner] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        createNewBoard({title: boardTitle, owner: boardOwner});
        setBoardTitle('');
        setBoardOwner('');
    }

    return(
        <Dialog onClose={onClose} open={isOpen}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        handleSubmit(event);
                        onClose();
                    },
                }}>
            <DialogTitle>Create a new board</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="boardTitle"
                    name="boardTitle"
                    label="Board Title"
                    placeholder="Name the board"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setBoardTitle(event.target.value)
                    }
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="boardOwner"
                    name="boardOwner"
                    label="Board Owner"
                    placeholder="Who is the owner?"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setBoardOwner(event.target.value)
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    )
};

NewBoardForm.propTypes = {
    createNewBoard: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NewBoardForm;