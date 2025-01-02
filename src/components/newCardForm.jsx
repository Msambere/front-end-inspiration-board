import PropTypes from 'prop-types';
import { useState } from 'react';
import './NewCardForm.css';

const NewCardForm =({createNewCard, currentBoard}) => {
    const [cardText, setCardText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submit ${cardText}`);
        createNewCard(currentBoard, {text: cardText});
        setCardText('');
        const newCardForm = document.getElementById("newCardForm");
        newCardForm.close();
    }

    return(
        <dialog id="newCardForm" className="newCardForm">
            <h2>Create a new card</h2>
            <form className='' onSubmit={handleSubmit}>
                <input
                type="text"
                name='card-text'
                placeholder='Write your card text here'
                value={cardText}
                onChange={(event) => setCardText(event.target.value)}
                />
                <div className="submit-button">
                    <input type="submit" name="Create new card"/>
                </div>
            </form>
        </dialog>
    )
};

NewCardForm.propTypes = {
    createNewCard: PropTypes.func.isRequired,
    currentBoard: PropTypes.number.isRequired,
};

export default NewCardForm;