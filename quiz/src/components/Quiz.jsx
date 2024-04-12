import React, { useState } from 'react'
import { resultInitialState } from '../constants'
import AnswerTimer from './AnswerTimer'
import Result from "./Results"

const Quiz = ({questions}) => {
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [answerIdx,setAnswerIdx] =useState(null)
    const[answer,setAnswer] = useState("")
    const [result, setResult]= useState(resultInitialState)
    const {question, choices, correctAnswer}= questions[currentQuestion]
    const [showResult, setShowResult] = useState(false)
    const [showAnswerTimer,setShowAnswerTimer] = useState(true)

    const onAnswerClick=(answer,index)=>{
        debugger
        setAnswerIdx(index)
        if(answer==correctAnswer){
            setAnswer(true)
        }
        else{
            setAnswer(false)
        }
    }
    const onClickNext =(finalAnswer)=>{
        setAnswerIdx(null)
        setShowAnswerTimer(false)
        setResult((prev)=>
        finalAnswer?{...prev,score:prev.score+5,correctAnswers:prev.correctAnswers+1,}:{...prev,wrongAnswers:prev.wrongAnswers+1}
        )
        if(currentQuestion !== questions.length-1){
            setCurrentQuestion(prev=>prev+1)
        }
        else{
            setCurrentQuestion(0)
            setShowResult(true)
        }
        setTimeout(() => {
            setShowAnswerTimer(true)
        }, 1000);
    }

    const onTryAgain =()=>{
        setResult(resultInitialState)
        setShowResult(false)
    }

    const handleTimeUp = () =>{
        setAnswer(false)
        onClickNext(false)
    }

  return (
   <>
        <div className='quiz-container'>
            {showAnswerTimer && !showResult && <AnswerTimer duration="80" onTimeUp={handleTimeUp}/>}
            {!showResult?( <>
                <span className='active-question-no'>{currentQuestion+1}</span>
                <span className='total-questions'>/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {choices.map((answer,index)=>(
                        <li 
                        onClick={()=>onAnswerClick(answer,index)}
                        className={answerIdx=== index ? 'selected-answer':null}
                        key={answer}>
                            {answer}
                        </li>
                    ))
                    }
                </ul>
                <div className='footer'>

                    <button onClick={()=>onClickNext(answer)} disabled={answerIdx==null}>{currentQuestion ===question.length-1?'Finish':'Next'}</button>
                </div>
            </>):<Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>}
           
        </div>
        </>
   
  )
}

export default Quiz