import PropTypes from 'prop-types'
import './Card.css';
import { useState } from 'react';
import { cardLikesAPICall, cardDeleteAPICall } from '../api/api';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';

const Card = ({ id, text, likes: initialLikes, onDeleteCard }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLikes = async () => {
    try {
      const responseAPI = await cardLikesAPICall(id);
      if (responseAPI && responseAPI.card) {
        setLikes(responseAPI.card.likes);
      }
    } catch (error) {
      console.log("Error:", error);
    } 
  };

  const handleDeleteCard = () => {
    try {
      cardDeleteAPICall(id);
      if (onDeleteCard) {
        onDeleteCard(id);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="card">
      <Button onClick={handleDeleteCard}>
        <ClearIcon 
        fontSize="small"
        />
      </Button>
      <p className="cardText">{text}</p>
      <button 
        className="likeButton" 
        onClick={handleLikes}
        >
        {likes}💖
      </button>
    </div>
  );
};

Card.propTypes ={
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default Card;