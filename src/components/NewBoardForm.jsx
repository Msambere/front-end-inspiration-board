import PropTypes from 'prop-types';
import { useState } from 'react';
import './NewBoardForm.css';

const NewBoardForm =({createNewBoard}) => {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardOwner, setBoardOwner] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submit ${boardTitle}, by ${boardOwner}`);
        createNewBoard({title: boardTitle, owner: boardOwner});
        setBoardTitle('');
        setBoardOwner('');
        const newBoardForm = document.getElementById("newBoardForm");
        newBoardForm.close();
    }

    return(
        <dialog id="newBoardForm" className="newBoardForm">
            <h2>Create a new baord</h2>
            <form className='' onSubmit={handleSubmit}>
                <input
                type="text"
                name='board-name'
                placeholder='Name the board'
                value={boardTitle}
                onChange={(event) => setBoardTitle(event.target.value)}
                />
                <input
                type='text'
                name='board-owner'
                placeholder='Who is the owner?'
                value={boardOwner}
                onChange={(event) => setBoardOwner(event.target.value)}
                />
                <div className="submit-button">
                    <input type="submit" name="submit new board"/>
                </div>
            </form>
        </dialog>
    )
};

NewBoardForm.propTypes = {
    createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;