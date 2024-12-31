import './App.css'
import CardContainer from './components/CardContainer';
import NewCardFormComponent from './components/NewCardForm';
import axios from 'axios';
import { useEffect, useState } from 'react';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const boardDataAPICall = () =>{
  return axios.get(`${VITE_APP_BACKEND_URL}/boards`)
        .then((response) => {
          return response.data.boards;
        })
        .catch((error) => {
          console.error('Error:', error)
        })
}

const newCardAPICall = (board_id, newCardData) =>{
  return axios.post(`${VITE_APP_BACKEND_URL}/boards/${board_id}/cards`, newCardData)
        .then((response) => {
          console.log('API Response:', response.data.card);
          return response.data.card;
        })
        .catch((error) => {
          console.error('Error:', error)
        })
};



function App() {
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(4);
  
  
  const retrieveBoardData = () => {
    return boardDataAPICall()
    .then((data) => {
      setBoardData(data);
      return data.boards;
    });
  };
  
  const getCards = (allBoardData) =>{
    const cards = [];
    for (const board of allBoardData){
      if(board.id === selectedBoard){
        for (const card of board.cards){
          cards.push(card);
        }
      }
    };
    return cards
  };
  
  useEffect(() => {
    retrieveBoardData()
  },[]);

  const createNewCard =(board_id, newCardData) =>{
    return newCardAPICall(board_id, newCardData)
    .then((data) => {
      retrieveBoardData();
      // setBoardData(boards =>boards.map((board) => {
      //   if(board.id === board_id){
      //     return {...board, cards: [...board.cards, data]}
      //   }else {
      //     return board;
      //   }
      });
    };



  return (
    <main>
      <header>
        <h1>It&apos;s a mood</h1>
      </header>
      <CardContainer cardData={getCards(boardData)} />
      <NewCardFormComponent createNewCard={createNewCard} currentBoard={selectedBoard} />
    </main>
  )
}

export default App
