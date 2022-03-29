import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function DetailTask() {
  const [form, setForm] = useState({
    _id: '',
    name: '',
    completed: false,
  })

  const [status, setStatus] = useState({
    msg: 'name',
    isShow: false,
    color: '',
  })

  const params = useParams()
  const navigate = useNavigate()

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }
  const updateStatus = (value) => {
    return setStatus((prev) => {
      return { ...prev, ...value }
    })
  }

  useEffect(() => {
    const getTask = async () => {
      const id = params.id.toString()

      const response = await fetch(`http://localhost:5000/task/${id}`, {
        method: 'GET',
      })

      if (!response.ok) {
        const msg = `An error occured: ${response.statusText}`
        window.alert(msg)
        return
      }

      const { task } = await response.json()

      if (task.length === 0) {
        const msg = `No task with id: ${id}`
        window.alert(msg)
        return
      }

      updateForm(task[0])
    }
    getTask()
  }, [params.id])

  const onSubmit = async (e) => {
    e.preventDefault()

    const { name, completed } = form

    const request = await fetch(`http://localhost:5000/task/${form._id}`, {
      method: 'post',
      body: JSON.stringify({ name, completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (request.ok) {
      updateStatus({ msg: 'Success', isShow: true, color: '#1e8c0d' })
    } else {
      updateStatus({ msg: 'Error', isShow: true, color: '#870b0b' })
    }

    setTimeout(() => {
      updateStatus({ isShow: false })
    }, 2000)
  }

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <h2>Edit Task</h2>
        <div className='form-group'>
          <label htmlFor='id'>Task ID</label>
          <label name='id'>{form._id}</label>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='checked'>Completed</label>
          <input
            type='checkbox'
            name='checked'
            checked={form.completed}
            onChange={(e) =>
              updateForm({
                completed: e.target.checked,
              })
            }
          />
        </div>
        <button type='submit' className='edit-submit'>
          Edit
        </button>
        <p className='status-text' style={{ color: status.color }}>
          {status.isShow ? status.msg : ''}
        </p>
      </form>
      <button
        className='home-btn'
        onClick={() => {
          navigate('/')
        }}
      >
        Back To Tasks
      </button>
    </div>
  )
}

export default DetailTask
