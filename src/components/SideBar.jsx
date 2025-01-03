import PropTypes from 'prop-types';

const SideBar = ({boards, selectBoardAction}) => {
    const boardButtons = boards.map((board) => {
        return( <button 
            key={board.id}
            className="board-sidebar-button" 
            onClick={() =>selectBoardAction(board.id)} // Changed to anonymous function so it isn't called immediately
    > 
        {board.title}
    </button>
    )
});

    const openNewBoardForm = () => {
        const newBoardForm = document.getElementById('newBoardForm');
        newBoardForm.showModal();
    };


    return (
        <aside className="sidebar">
            {boardButtons}
            <button onClick={openNewBoardForm} className="addBoardButton">+New Board</button>
        </aside>
    )
}

SideBar.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired,
            board_id: PropTypes.number.isRequired
        }))
    })).isRequired,
    selectBoardAction: PropTypes.func.isRequired
};

export default SideBar;