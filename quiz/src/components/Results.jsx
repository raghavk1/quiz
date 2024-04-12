import React, { useEffect, useState } from 'react'
import './Result_style.scss'
function Results({totalQuestions,result, onTryAgain}) {
    const [name,setName] = useState("")
    const [highScores,setHighScores] = useState([])
    const [showScores,setShowScores] = useState(false)

    useEffect(()=>{
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
    },[])
    const handleSave =() =>{
        const score =   {
            name,
            score:result.score 
        }
        const newHighScore = [...highScores, score].sort((a,b)=>b.score-a.score)
        setHighScores(newHighScore)
        setShowScores(true)
        localStorage.setItem('highScores',JSON.stringify(newHighScore))
    }

    const handleTryAgain = () =>{
        setShowScores(false)
        setHighScores([])
        onTryAgain()
    }

    
  return (
    <div className='result'>
                <h2>Result</h2>
                <p>Total Questions : <span>{totalQuestions}</span></p>
                <p>Total Score : <span>{result.score}</span></p>
                <p>Total Correct Ans : <span>{result.correctAnswers}</span></p>
                <p>Total Wrong Ans : <span>{result.wrongAnswers}</span></p>
                <button onClick={handleTryAgain}>Try Again</button>
                {!showScores ? <>
                    <h3>Enter Your Name to save the score</h3>
                    <input value={name} placeholder='Name...' onChange={(e)=>setName(e.target.value)}/>
                    <button onClick={handleSave}>Save</button>
                </> :<>
                <table>
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Name</th>
                            <th>Score</th>

                        </tr>
                    </thead>
                    <tbody>
                        {highScores.map((highscore,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{highscore.name}</td>
                                    <td>{highscore.score}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </>}
                </div>
  )
}

export default Results