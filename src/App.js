import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import './App.css';
import './components/CSS/style.css'
import { useEffect, useState } from 'react';

function App() {
    const [todo, setTodo] = useState([])
    const [completed, setCompleted] = useState([])
    const [isCompleteScreen, setIsCompleteScreen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')

    const NewTitle = (e) => setNewTitle(e.target.value)

    const NewDescription = (e) => setNewDescription(e.target.value)

    const AddTodo = () => {
        const items = {
        title: newTitle,
        description: newDescription,
        }

        const updateArr = [...todo]
        updateArr.push(items);
        setTodo(updateArr);
        localStorage.setItem('todolist', JSON.stringify(updateArr))
    }

    const Delete = (index) => {
        const updateArr = [...todo]
        updateArr.splice(index, 1)
        setTodo(updateArr)
        localStorage.setItem('todolist', JSON.stringify(updateArr))
    }

    const IsCompleted = () => {
        setIsCompleteScreen(true)
    }

    const IsNotCompleted = () => {
        setIsCompleteScreen(false)
    }

    const CompletedTodo = (index) => {
        const now = new Date()
        const day = now.getDate()
        const month = now.getMonth() + 1
        const year = now.getFullYear()
        const hour = now.getHours()
        const minute = now.getMinutes()
        const seconds = now.getSeconds()
        const completedOn = `${day}/${month}/${year} at ${hour}:${minute}:${seconds}`

        // ADDS COMPLETED PROPERTY
        const Filter = {
        ...todo[index],
        completedOn: completedOn
        }

        // STORE COMPLETED ,
        const updatedArr = [...completed]
        updatedArr.push(Filter)
        setCompleted(updatedArr)
        Delete(index)
        localStorage.setItem('completedTodo', JSON.stringify(updatedArr))

    }

    useEffect(() => {
        // RETRIEVE FROM LOCAL STORAGE
        const saved = JSON.parse(localStorage.getItem('todolist'));
        if (saved) {
        setTodo(saved)
        }

        const savedCompleted = JSON.parse(localStorage.getItem('completedTodo'))
        if (savedCompleted) {
        setCompleted(savedCompleted)
        }
    },[])

    const CompletedDelete = (index) => {
        const updatedArr = [...completed]
        updatedArr.splice(index, 1)
        setCompleted(updatedArr)
        localStorage.setItem('completedOn', JSON.stringify(updatedArr))
    }
    
    return (
        <>
        <h1>My Todos</h1>
        <div className='todo-wrapper'>
            <div className='todo-input'>
            <div className='todo-input-item'>
                <label>Title</label>
                <input type='text' name='title' value={newTitle} onChange={NewTitle} placeholder="What is the  task title?" />
            </div>

            <div className='todo-input-item'>
                <label>Description</label>
                <input type='text' name='title' value={newDescription} onChange={NewDescription}  placeholder="What's the task description?" />
            </div>

            <div className='todo-input-item'>
                <button type='button' className='primaryBtn' onClick={AddTodo} >Add</button>
            </div>
            </div>

            <div className='btn-area'>
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={IsNotCompleted} >Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={IsCompleted} >Completed</button>
            </div>
            {/* TODO DISPLAY */}
            { isCompleteScreen === false && todo.map((item, index) => {
            return (
                <div className='todo-list' key={index}>

                <div className='todo-list-item' >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>

                <div className='icons'>
                    <AiOutlineDelete className='icon' title='delete' onClick={() => Delete(index) }/>
                    <BsCheckLg className='check-icon' title='complete' onClick={() => CompletedTodo(index)} />
                </div>
                </div>
            )
            })
            }

            {/* COMPLETED DISPLAY */}
            { isCompleteScreen === true && completed.map((item, index) => {
            return (
                <div className='todo-list' key={index}>

                <div className='todo-list-item' >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: <b>{item.completedOn}</b></small></p>
                </div>

                <div className='icons'>
                    <AiOutlineDelete className='icon' title='delete' onClick={() => CompletedDelete(index) }/>
                </div>
                </div>
            )
            })
            }

        </div>
        </>
    );
}

export default App;