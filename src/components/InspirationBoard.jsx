import { useState, useEffect } from "react";
import "./InspirationBoard.css";
import BoardContainer from "./BoardContainer.jsx";
import Board from "./Board";
import {getAllBoards} from "../api/api.js";
import {Container} from "@mui/material";

const InspirationBoard = () => {
    const [boards, setBoards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(-1);

    // Fetch all boards on component mount
    useEffect(() => {
        getAllBoards().then((boards) => {setBoards(boards)});
    }, []);

    // Handler for when user selects a board from the sidebar
    const handleSelectBoard = (boardId) => {
        setSelectedBoardId(boardId);
    };


    return (
        <Container sx={{ mt: 2, backgroundColor: "#D4D1D1" }} >
                <BoardContainer
                    boards={boards}
                    onSelectBoard={handleSelectBoard}
                    setBoards={setBoards}
                />
                {selectedBoardId !== -1 && <Board boardId={selectedBoardId} />}
            </Container>
    );
};

export default InspirationBoard;