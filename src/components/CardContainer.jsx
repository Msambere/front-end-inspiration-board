import Card from "./Card";
import './CardContainer.css';
import PropTypes from 'prop-types';

const CardContainer = ({ cardData, onDeleteCard }) => {

    const cards = cardData.map((card) => {
        return (
          <Card 
            key={card.id} 
            id={card.id} 
            text={card.text} 
            likes={card.likes} 
            onDeleteCard={onDeleteCard}
          />
        )
    });

  return (
    <>

      <section className="cardContainer">
          {cards}
      </section>
    </>
  )
};

CardContainer.propTypes = {
    cardData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired
    })).isRequired,
    onDeleteCard: PropTypes.func.isRequired,
};


export default CardContainer;