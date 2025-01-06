import PropTypes from 'prop-types';
import { useState } from 'react';
import './newCardForm.css';

const NewCardForm =({createNewCard, currentBoard, setSubmitStatus}) => {
    const [cardText, setCardText] = useState('');

    const closeForm = () =>{
        setCardText("");
        const newCardForm = document.getElementById("newCardForm");
        newCardForm.close();
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (cardText.length < 1 || cardText.length >40){
            setSubmitStatus('Card text must be between 1 and 40 characters');
        }else{
            createNewCard(currentBoard, {text: cardText});
            setSubmitStatus('Card successfully created');
        }
        setCardText('');
        closeForm();
        document.getElementById('cardSubmitStatus').showModal();
    }


    return (
        <dialog id="newCardForm" className="newCardForm">
        <button className="cancel-btn" onClick={closeForm}>❌</button>
        <h2>Create a new card</h2>
        <form className="" onSubmit={handleSubmit}>
            <input
            type="text"
            name="card-text"
            placeholder="Write your card text here"
            value={cardText}
            onChange={(event) => setCardText(event.target.value)}
            />
            <div className="button-container">
            <input type="submit" name="Create new card" />
            </div>
        </form>
        </dialog>
    );
};

NewCardForm.propTypes = {
    createNewCard: PropTypes.func.isRequired,
    currentBoard: PropTypes.number.isRequired,
    setSubmitStatus: PropTypes.func.isRequired
};

export default NewCardForm;