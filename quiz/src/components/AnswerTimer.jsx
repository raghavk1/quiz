import "./AnswerTimer_style.scss"
import { useEffect, useState, useRef } from "react"

function AnswerTimer({duration,onTimeUp}){
    const [counter,setCounter] = useState(0)
    const [progressLoaded, setProgressLoaded] = useState(0)
    const intervalRef = useRef()
    useEffect(()=>{
       intervalRef.current = setInterval(()=>{
            setCounter(prev=>prev+1)
        },100)
        return () => clearInterval(intervalRef.current)
    },[])

    useEffect(()=>{
        setProgressLoaded((counter/ duration)*100)
        if(counter == duration){
            clearInterval(intervalRef.current)
            
                onTimeUp()
          
        }
    },[counter])
    
    return(
        <div className="answer-timer-container">
            <div 
            className="progress"
            style={{width:`${progressLoaded}%`, backgroundColor : `${progressLoaded < 40 ? 'green':progressLoaded<70?"orange":"red"}`}}
            ></div>
        </div>
    )
}
export default AnswerTimer