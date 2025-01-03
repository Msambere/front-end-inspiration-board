import { useState } from "react";
import PropTypes from "prop-types";
import NewBoardForm from "./NewBoardForm.jsx";
import {boardDataAPICall, newBoardAPICall} from "../api/api.js";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Box, Button, CardActionArea, CardActions, IconButton, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const BoardContainer = ({ boards, onSelectBoard, setBoards }) => {
    const [openCreateBoard, setOpenCreateBoard] = useState(false);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "16px",
                }}
            >
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => setOpenCreateBoard(true)}
                    sx={{
                        backgroundColor: "#a389d4",
                        color: "#ffffff",
                        "&:hover": { backgroundColor: "#915fc1" },
                    }}
                >
                    Create New Board
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid xs={12}>
                    <Grid container spacing={3} justifyContent="center">
                        {boards.map((board, index) => (
                            <Grid xs={12} sm={6} md={4} key={index}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "16px",
                                        backgroundColor: index === 2 ? "#e0e0e0" : "#ffffff",
                                        cursor: "pointer",
                                        height: "200px",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                        },
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <CardActionArea onClick={() => onSelectBoard(board.id)}>
                                        <CardContent>
                                            <Typography
                                                variant="h4"
                                                component="div"
                                                sx={{ fontWeight: "bold", textAlign: "center" }}
                                            >
                                                {board.title}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                component="div"
                                                sx={{ textAlign: "center", color: "gray" }}
                                            >
                                                Owner: {board.owner ?? "no owner"}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                component="div"
                                                sx={{ textAlign: "center", color: "gray" }}
                                            >
                                                Cards: {board.cards.length}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Stack direction="row" spacing={1}>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* New Board Form */}
            <NewBoardForm
                createNewBoard={(data)=> {
                    newBoardAPICall(data).then(() => {boardDataAPICall().then(allBoards => {setBoards(allBoards)})});
                }}
                isOpen={openCreateBoard}
                onClose={() => setOpenCreateBoard(false)}
            />
        </>
    );
};

BoardContainer.propTypes = {
    boards: PropTypes.array.isRequired,
    onSelectBoard: PropTypes.func.isRequired,
    setBoards:PropTypes.func.isRequired
};

export default BoardContainer;