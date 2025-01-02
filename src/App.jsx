import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

import CardContainer from './components/CardContainer';
import NewCardForm from './components/NewCardForm';
import SideBar from "./components/SideBar.jsx";
import Board from "./components/Board.jsx";
import NewBoardForm from './components/NewBoardForm.jsx';

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

const newBoardAPICall = (newBoardData) =>{
  return axios.post(`${VITE_APP_BACKEND_URL}/boards`, newBoardData)
        .then((response) => {
          console.log('API Response:', response.data.board);
          return response.data.board;
        })
        .catch((error) => {
          console.error('Error:', error)
        })
};


function App() {
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(1);
  const [view, setView] = useState('board');

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

  const createNewBoard = (newBoardData) => {
    return newBoardAPICall(newBoardData)
    .then((data) => {
      retrieveBoardData();
    });
  }

  return (
    <main>
      <header>
        <h1>It&apos;s A Mood</h1>
      </header>
      {/* if the view = 'cards then render everthing below */}
      <CardContainer cardData={getCards(boardData)} />
      <NewCardForm createNewCard={createNewCard} currentBoard={selectedBoard} />
      
      {/* if the view = 'board' render everything below */}
        <SideBar boards={boardData} selectBoardAction={setSelectedBoard}></SideBar>
        <NewBoardForm createNewBoard={createNewBoard}/>

    </main>
  )
}

export default App
