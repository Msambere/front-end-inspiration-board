import Card from "./Card";
import './CardContainer.css';
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const openNewCardForm = () => {
  const newCardForm = document.getElementById('newCardForm');
  newCardForm.showModal();
};

const CardContainer = ({cardData}) => {

    const cards = cardData.map((card) => {
        return(
            <Card key={card.id} text={card.text} likes={card.likes} />
        )
    });

  return (
    <>

      <section className="cardContainer">
          {cards}
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={openNewCardForm}
            sx={{
                backgroundColor: "#a389d4",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#915fc1" },
            }}>
          Create New Card
          </Button>
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
    // sortValue: PropTypes.string.isRequired,
    // sortOrder: PropTypes.string.isRequired
    //     likes: PropTypes.number.isRequired,
    // })).isRequired
};


export default CardContainer;