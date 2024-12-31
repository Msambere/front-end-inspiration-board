import Board from "./Board.jsx";
import "./BoardContainer.css"
const BoardContainer = ({boards}) => {
    return <section className="board-container"> {boards.map((board) => (
        <Board id={board.id} cards={board.cards} owner={board.owner} title={board.title}></Board>
    ))}
    </section>
}

export default BoardContainer;