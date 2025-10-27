import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
const handleEnter = () => {

    setTasks([...tasks, task])
    setTask('')
  }
  const deleTask = (item) => () => {
    setTasks(tasks.filter(t => t !== item))
      
  }
  return (
    <>
      <div id='container'>
       <h3 >Todos</h3>
       <form >
        <input placeholder='Add new task' value={task} onChange={e=> setTask(e.target.value)} onKeyDown={e => {if(e.key === 'Enter'){e.preventDefault(),handleEnter()}}}/>
        </form>
        <ul>{
          tasks.map(item => (
            <li >{item}
            <button className='deleteButton' onClick={deleTask(item)}>remove</button>
            </li>
          ))
          }
        </ul>
      </div>
     
   
    </>
  )
}

export default App
