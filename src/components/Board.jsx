import { useState,} from "react";
import { boardDataAPICall, newCardAPICall } from "../api/api.js";
import PropTypes from "prop-types";
import NewCardForm from "./newCardForm.jsx";
import CardContainer from "./CardContainer.jsx";
import SortingButtons from "./SortingButtons.jsx";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button } from '@mui/material';
import sortData from "../utils/sort.js";

const Board = ({ boardId, onViewAllBoards, allBoards, setBoards }) => {
  const [newCardSubmitStatus, setNewCardSubmitStatus] = useState(null);
  const [sortValue, setSortValue] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");


 const currentBoard = allBoards.find((board) => board.id === boardId);

  const sortOptions = { "Id": "id", "Likes": "likes", "Alphabetically": "text" }; // Is there a way to extract this from data?


    const createNewCard = (board_id, newCardData) => {
    return newCardAPICall(board_id, newCardData).then(() => {
      boardDataAPICall().then((boards) => {setBoards(boards)
      });
    });
  };

  const closeSubmitStatusDialog = () => {
    document.getElementById('cardSubmitStatus').close();
    setNewCardSubmitStatus(null);
  };

  if (!currentBoard) {
    return <div>Loading board...</div>;
  }

  const handleDeleteCard = (id) => {
    setBoard((prevBoard) => {
      if (!prevBoard) {
        return prevBoard;
      }

      const updatedCards = prevBoard.cards.filter((card) => card.id !== id);
      return {
        ...prevBoard,
        cards: updatedCards,
      }
    });
  };

  return (
    <>
      <Box sx={{ padding: 2, backgroundColor: '#dcdcdc', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            variant="outlined"
            onClick={onViewAllBoards}
            sx={{
              backgroundColor: "#a389d4",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#915fc1" },
            }}
          >
            View All Boards
          </Button>
        </Box>

        <h1>{currentBoard.title}</h1>
        <SortingButtons options={sortOptions} setSortValue={setSortValue} setSortOrder={setSortOrder} sortValue={sortValue} sortOrder={sortOrder} />


        <CardContainer cardData={sortData(currentBoard.cards, sortOptions, sortValue, sortOrder)} onDeleteCard={handleDeleteCard} />
      </Box>

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
  allBoards: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          likes: PropTypes.number.isRequired,
        }
      )).isRequired,
    }
  )).isRequired,
  setBoards: PropTypes.func.isRequired,
};

export default Board;
