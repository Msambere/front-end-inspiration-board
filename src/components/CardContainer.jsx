import Card from "./Card";
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid2";
const CardContainer = ({ cardData, updateBoardUseState }) => {
  return (<Grid container spacing={3} sx={{ padding: 2 }}>
              <Grid xs={12}>
                  <Grid container spacing={3} justifyContent="center">
                      {cardData.map((card, index) => (
                          <Grid xs={12} sm={6} md={4} key={index}>
                              <Card key={card.id} id={card.id} text={card.text} likes={card.likes} updateBoardUseState={updateBoardUseState}/>
                          </Grid>
                      ))}
                  </Grid>
              </Grid>
          </Grid>
  )
};

CardContainer.propTypes = {
    cardData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired
    })).isRequired,
    updateBoardUseState: PropTypes.func.isRequired,
};


export default CardContainer;