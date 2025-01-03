import './App.css'
import InspirationBoard from "./components/InspirationBoard.jsx";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {boardDataAPICall} from "./api/api.js";
<a href=""></a>
import { useEffect, useState } from 'react';

function App() {
    const [boards, setBoards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(-1);

    // Fetch all boards on component mount
    useEffect(() => {
        boardDataAPICall().then((boards) => {setBoards(boards)});
    }, []);

    // Handler for when user selects a board from the sidebar
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
              <InspirationBoard boards={boards} setBoards={setBoards} handleSelectBoard={handleSelectBoard}/>
              {/* <Board/> */}
          </Container>
      </>

  )
}

export default App
