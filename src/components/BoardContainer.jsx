import { useState } from "react";
import PropTypes from "prop-types";
import NewBoardForm from "./NewBoardForm.jsx";
import {
  boardDataAPICall,
  deleteBoardAPICall,
  newBoardAPICall,
} from "../api/api.js";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  Stack,
  Typography,
  Container
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SortingButtons from "./SortingButtons.jsx";
import sortData from "../utils/sort.js";
import './BoardContainer.css';

const BoardContainer = ({ boards, onSelectBoard, setBoards, loading }) => {
  const [openCreateBoard, setOpenCreateBoard] = useState(false);
  const sortOptions = {
    Id: "id",
    Owner: "owner",
    Alphabetically: "title",
    "# of Cards": ["cards", "length"],
  }; 
  const [sortValue, setSortValue] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <Container
      id="all-boards-container"
      sx={{ mt: 2, backgroundColor: "#D4D1D1" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => setOpenCreateBoard(true)}
          sx={{
            backgroundColor: "#a389d4",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#915fc1" },
          }}
        >
          Create New Board
        </Button>
        <SortingButtons
          options={sortOptions}
          setSortValue={setSortValue}
          setSortOrder={setSortOrder}
          sortValue={sortValue}
          sortOrder={sortOrder}
        />
      </Box>
      {loading ? (
        <div className="loading-msg">
          <h1>Loading Boards...</h1>
          <img className="loading-img" src="loading.gif" alt="loading gif" />
        </div>
      ) : boards.length === 0 ? (
        <div className="no-boards-msg">
          <h1> Create a board and set the mood!</h1>
        </div>
      ) : (
        <Grid id="board-grid" container spacing={3} sx={{ padding: 2 }}>
          <Grid xs={12}>
            <Grid container spacing={3} justifyContent="center">
              {sortData(boards, sortOptions, sortValue, sortOrder).map(
                (board, index) => (
                  <Grid xs={12} sm={6} md={4} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: "16px",
                        cursor: "pointer",
                        height: "300px",
                        width: "300px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "16px",
                      }}
                    >
                      <CardActionArea
                        className="card-title"
                        onClick={() => onSelectBoard(board.id)}
                      >
                        <CardContent>
                          <Typography
                            variant="h4"
                            component="div"
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {board.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ textAlign: "center", color: "gray" }}
                          >
                            Owner: {board.owner ?? "no owner"}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{ textAlign: "center", color: "gray" }}
                          >
                            Cards: {board.cards.length}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              deleteBoardAPICall(board.id).then(() => {
                                boardDataAPICall().then((newBoards) =>
                                  setBoards(newBoards)
                                );
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
      <NewBoardForm
        createNewBoard={(data) => {
          newBoardAPICall(data).then(() => {
            boardDataAPICall().then((allBoards) => {
              setBoards(allBoards);
            });
          });
        }}
        isOpen={openCreateBoard}
        onClose={() => setOpenCreateBoard(false)}
      />
      <dialog id="boardSubmitErrorMsg">
        <section className="dialog-content">
          <p>Board must have a title and owner</p>
          <button
            onClick={() =>
              document.getElementById("boardSubmitErrorMsg").close()
            }
          >
            Close
          </button>
        </section>
      </dialog>
    </Container>
  );
};

BoardContainer.propTypes = {
  boards: PropTypes.array.isRequired,
  onSelectBoard: PropTypes.func.isRequired,
  setBoards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BoardContainer;
