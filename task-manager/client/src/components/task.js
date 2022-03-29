import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/task.css'

function Task() {
  const [name, setName] = useState('')
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/task', {
      method: 'GET',
    })

    if (!response.ok) {
      const msg = `An error has occured: ${response.statusText}`
      window.alert(msg)
      return
    }

    const data = await response.json()
    setTasks(data.tasks)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name.length >= 20) {
      window.alert('Can not more than 20 characters')
      setName('')
      return
    }

    if (name.length === 0) {
      window.alert('Input is empty !!')
      return
    }

    await fetch(`http://localhost:5000/task`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    }).catch((err) => {
      window.alert(err)
      console.log(err)
      return
    })

    setName('')
    fetchData()
    navigate('/')
  }

  useEffect(() => {
    fetchData()

    return
  }, [tasks.length])

  const deleteTask = async (id) => {
    const request = await fetch(`http://localhost:5000/task/${id}`, {
      method: 'DELETE',
    })

    if (!request.ok) {
      const msg = `An error occured: ${request.statusText}`

      window.alert(msg)
      return
    }

    fetchData()
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Task Manager</h2>
        <div className='form-control'>
          <input
            type='text'
            placeholder='e.g. wash dishes'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type='submit'>Submit</button>
        </div>
      </form>
      <div>
        {tasks.map((task) => {
          return (
            <div className='task' key={task._id}>
              <p
                style={{
                  textDecoration: `${task.completed ? 'line-through' : 'none'}`,
                }}
              >
                {task.name}
              </p>
              <div className='tool-group'>
                <button
                  className='edit-btn'
                  onClick={() => {
                    navigate(`/task/${task._id}`)
                  }}
                >
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => {
                    deleteTask(task._id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Task
