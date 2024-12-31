import Card from "./Card";
import './CardContainer.css';
import PropTypes from 'prop-types';

const CardContainer = ({cardData}) => {
    const cards = cardData.map((card) => {
        return(
            <Card key={card.id} text={card.text} likes={card.likes} />
        )
    });

    const openNewCardForm = () => {
        const newCardForm = document.getElementById('newCardForm');
        newCardForm.showModal();
    };

    return(
        <section className="cardContainer">
            {cards}
            <button onClick={openNewCardForm} className="addCardButton">+</button>
        </section>
    )

};

CardContainer.propTypes = {
    cardData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired
    })).isRequired
};


export default CardContainer;