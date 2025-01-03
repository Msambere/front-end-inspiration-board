import axios from "axios";

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const newBoardAPICall = (newBoardData) => {
  return axios
    .post(`${VITE_APP_BACKEND_URL}/boards`, newBoardData)
    .then((response) => {
      console.log("API Response:", response.data.board);
      return response.data.board;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const singleBoardAPICall = (boardId) => {
  return axios
    .get(`${VITE_APP_BACKEND_URL}/boards/${boardId}`)
    .then((response) => {
      return response.data.board;
    })
    .catch((error) => {
      console.error("Error fetching board:", error);
    });
};

export const boardDataAPICall = () => {
  return axios
    .get(`${VITE_APP_BACKEND_URL}/boards`)
    .then((response) => {
      return response.data.boards;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const newCardAPICall = (board_id, newCardData) => {
  return axios
    .post(`${VITE_APP_BACKEND_URL}/boards/${board_id}/cards`, newCardData)
    .then((response) => {
      console.log("API Response:", response.data.card);
      return response.data.card;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
