import { useState, useEffect } from "react";
import { singleBoardAPICall, newCardAPICall } from "../api/api.js";
import PropTypes from "prop-types";
import NewCardForm from "./newCardForm.jsx";
import CardContainer from "./CardContainer.jsx";

const Board = ({ boardId }) => {
  const [board, setBoard] = useState(null);
  const [newCardSubmitStatus, setNewCardSubmitStatus] = useState(null);

  useEffect(() => {
    singleBoardAPICall(boardId).then((newBoard) => {
      setBoard(newBoard);
    });
  }, [boardId]);

  const createNewCard = (board_id, newCardData) => {
    return newCardAPICall(board_id, newCardData).then(() => {
      singleBoardAPICall(boardId).then((newBoard) => {
        setBoard(newBoard);
      });
    });
  };

  const closeSubmitStatusDialog = () => {
    document.getElementById('cardSubmitStatus').close();
    setNewCardSubmitStatus(null);
  };

  if (!board) {
    return <div>Loading board...</div>;
  }

  return (
    <>
      <CardContainer cardData={board.cards} />
      <NewCardForm createNewCard={createNewCard} currentBoard={boardId} setSubmitStatus={setNewCardSubmitStatus}/>
      <dialog id="cardSubmitStatus">
        {newCardSubmitStatus}
        <button onClick={closeSubmitStatusDialog}>Close</button>
      </dialog>
    </>
  );
};

Board.propTypes = {
  boardId: PropTypes.number.isRequired,
};

export default Board;
