import './App.css'
import InspirationBoard from "./components/InspirationBoard.jsx";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";

function App() {
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
              <InspirationBoard/>
          </Container>
      </>

  )
}

export default App
