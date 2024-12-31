import CardContainer from "./CardContainer.jsx";
import './Board.css';

const Board = ({id, owner, title, cards}) => {

    return <section className="board">
        <h3 id={id}>{title}</h3>
        <h4>Owner{owner}</h4>
        <CardContainer cardData={cards}/>
    </section>
}

export default Board;