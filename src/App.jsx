import './App.css'
import BoardContainer from './components/BoardContainer.jsx';
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

    const handleViewAllBoards = () => {
        setSelectedBoardId(null);
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
                        allBoards={boards}
                        setBoards={setBoards}
                    />
                ) : (
                    <BoardContainer
                        boards={boards}
                        setBoards={setBoards}
                        onSelectBoard={handleSelectBoard}
                    />
                )}
            </Container>
        </>

    )
}

export default App
