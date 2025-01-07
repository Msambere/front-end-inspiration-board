import './App.css'
import BoardContainer from './components/BoardContainer.jsx';
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {boardDataAPICall} from "./api/api.js";
import { useEffect, useState } from 'react';
import Board from './components/Board.jsx'

function App() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    useEffect(() => {
        boardDataAPICall().then((boards) => {
            setTimeout(() => {
              setBoards(boards)
              setLoading(false);
              console.log("Delayed for 2 second.");
            }, 2000);
        });
    }, []);

    const handleSelectBoard = (boardId) => {
        setSelectedBoardId(boardId);
    };

    const handleViewAllBoards = () => {
        setSelectedBoardId(null);
    };

    // if(loading) {
    //     return <div>Loading...</div>;
    // }
    return (
      <>
        <AppBar id="header" position="static">
          <Toolbar>
            <Typography
              id="site-title"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              It&apos;s A Mood 😎
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" spacing={2}>
          {selectedBoardId !== null ? (
            <Board
              boardId={selectedBoardId}
              onViewAllBoards={handleViewAllBoards}
              allBoards={boards}
              setBoards={setBoards}
            />
          ) : (
            <BoardContainer
              boards={boards}
              setBoards={setBoards}
              onSelectBoard={handleSelectBoard}
              loading={loading}
            />
          )}
        </Container>
      </>
    );
}

export default App
