// import PropTypes from 'prop-types';
import { useState } from 'react';

const NewCardFormComponent =() => {
    const [cardText, setCardText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submit ${cardText}`);
        setCardText('');
    }

    return(
        <section className="cardForm">
            <h2>Create a new card</h2>
            <form className='' onSubmit={handleSubmit}>
                <input
                type="text"
                name='card-text'
                placeholder='Add an inspiring message'
                value={cardText}
                onChange={(event) => setCardText(event.target.value)}
                />
                <div className="submit-button">
                    <input type="submit" name="Create new card"/>
                </div>
            </form>
        </section>
    )
};

// NewCardFormComponent.propTypes = {
//     submissionHandler: PropTypes.func.isRequired,
// };

export default NewCardFormComponent;