import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailTask from './components/detailTask'
import Task from './components/task'
import './components/task.css'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Task />}></Route>
        <Route path='/task/:id' element={<DetailTask />}></Route>
      </Routes>
    </div>
  )
}

export default App
