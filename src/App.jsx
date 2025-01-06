import './App.css'
import InspirationBoard from "./components/InspirationBoard.jsx";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {boardDataAPICall} from "./api/api.js";
import { useEffect, useState } from 'react';
import Board from './components/Board.jsx'

function App() {
    const [boards, setBoards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    useEffect(() => {
        boardDataAPICall().then((boards) => {setBoards(boards)});
    }, []);

    const handleSelectBoard = (boardId) => {
        setSelectedBoardId(boardId);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Inspiration Board
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" spacing={2}>
                {selectedBoardId !== null ? (
                    <Board 
                        boardId={selectedBoardId}
                        onViewAllBoards={handleViewAllBoards} 
                    />
                ) : (
                    <InspirationBoard
                        boards={boards}
                        setBoards={setBoards}
                        handleSelectBoard={handleSelectBoard}
                    />
                )}
            </Container>
        </>

    )
}

export default App
