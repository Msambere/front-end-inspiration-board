import PropTypes from 'prop-types'
import './Card.css';
import { useState } from 'react';
import { cardLikesAPICall } from '../api/api';


const Card = ({ id, text, likes: initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLikes = async () => {
    if (isLiking) return;
    setIsLiking(true);
    
    try {
      const responseAPI = await cardLikesAPICall(id);
      if (responseAPI && responseAPI.card) {
        setLikes(responseAPI.card.likes);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="card">
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
};

export default Card;