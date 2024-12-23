import './App.css'
import Card from './components/Card';
const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;


const CARD_TEST_DATA = {
  id: 1,
  text: 'We got this!',
  likes: 100
};




function App() {
  return (
    <>
      <h1>It&apos;s a mood</h1>
      <Card text={CARD_TEST_DATA.text} likes={CARD_TEST_DATA.likes} />
    </>
  )
}

export default App
