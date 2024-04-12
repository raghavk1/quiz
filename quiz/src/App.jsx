import { useState } from 'react'
import Quiz from './components/Quiz'
import { quizQues } from './constants'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Quiz questions={quizQues.questions}/>
    </>
  )
}

export default App
