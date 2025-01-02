const SideBar = ({boards, selectBoardAction}) => {
    return <aside className="sidebar">
        {boards.map((board) => (<button key={board.id} className="board-sidebar-button" onClick={selectBoardAction(board.id)}> {board.title}</button>))}
    </aside>
}

export default SideBar;