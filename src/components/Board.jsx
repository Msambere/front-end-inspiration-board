import { useState, useEffect } from "react";
import { singleBoardAPICall, newCardAPICall } from "../api/api.js";
import PropTypes from "prop-types";
import NewCardForm from "./newCardForm.jsx";
import CardContainer from "./CardContainer.jsx";
import SortingButtons from "./SortingButtons.jsx";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import sortData from "../utils/sort.js";

const Board = ({ boardId, onViewAllBoards }) => {
  const [board, setBoard] = useState(null);
  const [newCardSubmitStatus, setNewCardSubmitStatus] = useState(null);
  const [sortValue, setSortValue] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {
    singleBoardAPICall(boardId).then((newBoard) => {
      setBoard(newBoard);
    });
  }, [boardId]);

  const sortOptions = {"Id":"id", "Likes":"likes", "Alphabetically":"text"}; // Is there a way to extract this from data?


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
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        onClick={onViewAllBoards}
        sx={{
          backgroundColor: "#a389d4",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#915fc1" },
        }}
      >
        View All Boards
      </Button>
      <h1>{board.title}</h1>
      <SortingButtons options={sortOptions} setSortValue={setSortValue} setSortOrder={setSortOrder} sortValue={sortValue} sortOrder={sortOrder}/>
      <CardContainer cardData={sortData(board.cards, sortOptions, sortValue, sortOrder)} />
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
  onViewAllBoards: PropTypes.func.isRequired,
};

export default Board;
