import PropTypes from 'prop-types'
import './Card.css';

const Card = ({text, likes}) =>{
  return (
    <div className="card">
      <p className="cardText">{text}</p>
      <button className="likeButton">{likes}💖</button>
    </div>
  );
};

Card.propTypes ={
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
};

export default Card;