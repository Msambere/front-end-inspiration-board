import { useState,} from "react";
import './Board.css';
import { boardDataAPICall, newCardAPICall } from "../api/api.js";
import PropTypes from "prop-types";
import NewCardForm from "./newCardForm.jsx";
import CardContainer from "./CardContainer.jsx";
import SortingButtons from "./SortingButtons.jsx";
import { Button, Container, Box } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from "@mui/icons-material/Add";
import sortData from "../utils/sort.js";

const openNewCardForm = () => {
  const newCardForm = document.getElementById("newCardForm");
  newCardForm.showModal();
};

const Board = ({ boardId, onViewAllBoards, allBoards, setBoards }) => {
  const [sortValue, setSortValue] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");


  const currentBoard = allBoards?.find((board) => board.id === boardId);

  const sortOptions = {"Id":"id", "Likes":"likes", "Alphabetically":"text"};


  const createNewCard = (board_id, newCardData) => {
    return newCardAPICall(board_id, newCardData).then(() => {
      boardDataAPICall().then((boards) => {setBoards(boards)
      });
    });
  };

  const handleDeleteCard = () => {
    boardDataAPICall().then((boards) => {
      setBoards(boards);
    });
  };

  if (!currentBoard) {
    return <div>Loading board...</div>;
  }

  return (
    <>
      <Button
        id="viewAllBoardsButton"
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
      <Container
        id="all-cards-container"
        sx={{ mt: 2, backgroundColor: "#D4D1D1" }}
      >
        <Box
          id="card-board-header"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px",
          }}
        >
          <h1>Board: {currentBoard.title}</h1>
          <section className="header-buttons">
            <Button
              id="newCardButton"
              variant="contained"
              endIcon={<AddIcon />}
              onClick={openNewCardForm}
              sx={{
                backgroundColor: "#a389d4",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#915fc1" },
              }}
            >
              Create New Card
            </Button>
            <SortingButtons
              options={sortOptions}
              setSortValue={setSortValue}
              setSortOrder={setSortOrder}
              sortValue={sortValue}
              sortOrder={sortOrder}
            />
          </section>
        </Box>
        <CardContainer
          cardData={sortData(
            currentBoard.cards,
            sortOptions,
            sortValue,
            sortOrder
          )}
          onDeleteCard={handleDeleteCard}
        />
        <NewCardForm
          createNewCard={createNewCard}
          currentBoard={boardId}
        />
        <dialog id="cardSubmitErrorMsg">
          <section className="dialog-content">
            <p>Card text must be between 1 and 40 characters</p>
            <button onClick={() => document.getElementById('cardSubmitErrorMsg').close()}>Close</button>
          </section>
        </dialog>
      </Container>
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
