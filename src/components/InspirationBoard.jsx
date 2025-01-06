import "./InspirationBoard.css";
import BoardContainer from "./BoardContainer.jsx";
import {Container} from "@mui/material";
import PropTypes from "prop-types";
import Card from "./Card.jsx";

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
InspirationBoard.propTypes ={
    boards: PropTypes.array.isRequired,
    setBoards: PropTypes.func.isRequired,
    handleSelectBoard: PropTypes.func.isRequired,
};

export default InspirationBoard;