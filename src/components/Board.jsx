import { useState, useEffect } from "react";
import { singleBoardAPICall, newCardAPICall } from "../api/api.js";
import PropTypes from "prop-types";
import NewCardForm from "./newCardForm.jsx";
import CardContainer from "./CardContainer.jsx";
import SortingButtons from "./SortingButtons.jsx";

const Board = ({ boardId }) => {
  const [board, setBoard] = useState(null);
  const [newCardSubmitStatus, setNewCardSubmitStatus] = useState(null);
  const [sortValue, setSortValue] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    singleBoardAPICall(boardId).then((newBoard) => {
      setBoard(newBoard);
    });
  }, [boardId]);

  const sortOptions = ["Id", "Likes", "Alphabetically"];


  const sortedCardData = (data) => {
    switch (sortValue) {
      case "Id":
        return data.sort((a, b) => {
          return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
        });
      case "Likes":
        return data.sort((a, b) => {
          return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
        });
      case "Alphabetically":
        return data.sort((a, b) => {
          return sortOrder === "asc"
            ? a.text.localeCompare(b.text)
            : b.text.localeCompare(a.text);
        });
      default:
        return data;
    }
  };



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
      <h1>{board.title}</h1>
      <SortingButtons options={sortOptions} setSortValue={setSortValue} setSortOrder={setSortOrder} sortValue={sortValue} sortOrder={sortOrder}/>
      <CardContainer cardData={sortedCardData(board.cards)} sortValue={sortValue} sortOrder={sortOrder} />
      <NewCardForm createNewCard={createNewCard} currentBoard={boardId} setSubmitStatus={setNewCardSubmitStatus} />
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
