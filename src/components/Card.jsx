import PropTypes from 'prop-types'
import { useState } from 'react';
import { cardLikesAPICall, cardDeleteAPICall } from '../api/api';
import { CardActions, IconButton, Stack, Typography } from '@mui/material';
import MCard from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = ({ id, text, likes: initialLikes, updateBoardUseState }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLikes = async () => {
    try {
      const responseAPI = await cardLikesAPICall(id);
      if (responseAPI && responseAPI.card) {
        setLikes(responseAPI.card.likes);
        updateBoardUseState();
      }
    } catch (error) {
      console.log("Error:", error);
    } 
  };

  const handleDeleteCard = () => {
    return cardDeleteAPICall(id).then(() => {
      updateBoardUseState();
      })
    };

  return (
      <MCard
          variant="outlined"
          sx={{
            borderRadius: "16px",
            cursor: "pointer",
              height: "300px",
              width: "300px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <Typography component="h1" variant="h5" align={'center'}>{text}</Typography>
        <CardActions>
          <Stack direction="row" spacing={3}>
            <IconButton aria-label="delete" onClick={handleDeleteCard}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="like" onClick={handleLikes} >
              {likes}
              <FavoriteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </MCard>
  );
};

Card.propTypes ={
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  updateBoardUseState: PropTypes.func.isRequired,
};

export default Card;