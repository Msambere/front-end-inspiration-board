import "./InspirationBoard.css";
import BoardContainer from "./BoardContainer.jsx";
import {Container} from "@mui/material";

const InspirationBoard = ({boards, setBoards, handleSelectBoard}) => {

    return (
        <Container sx={{ mt: 2, backgroundColor: "#D4D1D1" }} >
                <BoardContainer
                    boards={boards}
                    onSelectBoard={handleSelectBoard}
                    setBoards={setBoards}
                />
                {/* {selectedBoardId !== -1 && <Board boardId={selectedBoardId} />} */}
            </Container>
    );
};

export default InspirationBoard;