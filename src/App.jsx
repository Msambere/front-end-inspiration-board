import './App.css'
import CardContainer from './components/CardContainer';
import NewCardFormComponent from './components/NewCardForm';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;


const CARD_TEST_DATA = [
  {
    id: 1,
    text: 'We got this!',
    likes: 100
  },
  {
    id: 2,
    text: 'We can do it!',
    likes: 200
  },
  {
    id: 3,
    text: 'We are fullstack SWEs!',
    likes: 300
  },
  {
    id: 4,
    text: 'Mood Board baddies for the W!',
    likes: 500
  },
  

];




function App() {
  return (
    <main>
      <header>
        <h1>It&apos;s a mood</h1>
      </header>
      <CardContainer cardData={CARD_TEST_DATA} />
      <NewCardFormComponent />
    </main>
  )
}

export default App
