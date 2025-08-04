import React, {useState, useEffect, use} from 'react'
import { MdEdit } from "react-icons/md";

export default function App() {



  const [text, setText] = useState('');

   const [task, setTask] = useState([
    {
      id:0,
      text: text
    }
   ]);


   const clearInput = () => {
    setText('')
   }

  const addTask = (element) => {
    
    setTask((prev) => {

      return [...prev, {id: prev.length, text: element}]

    })

  }

  const deleteTask = (id) => {
    setTask((prev) => {
      return prev.filter(el => el.id !== id)
    })
  }


  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem('task-list'));
    if(savedTask && Array.isArray(savedTask)) {
      setTask(savedTask);
    }

    setIsLoaded(true);
  }, [])

  useEffect(() => {
    if(isLoaded) {
      localStorage.setItem('task-list', JSON.stringify(task));
    }

  },[task, isLoaded])





  return (
    <div className='wrapper'>
      <p>Список задач:</p>


      <div className='input-wrapper'>
        <input type='text' placeholder='Введіть нову задачу' value={text}  onChange={e => setText(e.target.value)} />
        <button onClick={() => {addTask(text); clearInput()}}  disabled={text == ''}  >Встановити задачу</button>
      </div>

      <div>
        <ol>
          {
            task.map((el) => (
              el.text !== '' && (
                <div key={el.id} className='list'>
                  <li>
                    {el.text}
                  </li>

                  <span className='delete-task' onClick={() => deleteTask(el.id)} >Видалити задачу</span>
                </div>

              )
            ))
          }
        </ol>
      </div>
      
    </div>
  )

  
}
