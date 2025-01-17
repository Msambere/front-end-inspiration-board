import axios from "axios";

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const newBoardAPICall = (newBoardData) => {
  return axios
    .post(`${VITE_APP_BACKEND_URL}/boards`, newBoardData)
    .then((response) => {
      return response.data.board;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteBoardAPICall = (boardId) => {
  if (!boardId) {
    console.error("Invalid boardId provided:", boardId);
  }
  return axios
      .delete(`${VITE_APP_BACKEND_URL}/boards/${boardId}`)
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
};
export const singleBoardAPICall = (boardId) => {
  if (!boardId) {
    console.error("Invalid boardId provided:", boardId);
  }
  
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
      return response.data.card;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const cardLikesAPICall = (cardId) => {
  return axios
    .patch(`${VITE_APP_BACKEND_URL}/cards/${cardId}/likes`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const cardDeleteAPICall = (cardId) => {
  return axios
    .delete(`${VITE_APP_BACKEND_URL}/cards/${cardId}`)
    .catch((error) => {
      console.error("Error:", error);
    });
};