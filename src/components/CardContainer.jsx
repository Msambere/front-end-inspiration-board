import Card from "./Card";
import './CardContainer.css';
import PropTypes from 'prop-types';

const CardContainer = ({cardData, sortValue, sortOrder}) => {
    // const sortedCardData = (data) => {
    //     switch(sortValue) {
    //         case "id":
    //             return data.sort((a, b) => {
    //                 return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    //             });
    //         case "likes":
    //             return data.sort((a, b) => {
    //                 return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
    //             });
    //         case "text":
    //             return data.sort((a, b) => {
    //                 return sortOrder === "asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
    //             });
    //         default:
    //             return data;
    //     }
    // };

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
            <button onClick={openNewCardForm} className="addCardButton">+New Card</button>
        </section>
    )

};

CardContainer.propTypes = {
    cardData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired
    })).isRequired,
    sortValue: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired
};


export default CardContainer;