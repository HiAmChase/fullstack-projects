const Task = require('../model/task')
const mongoose = require('mongoose')

const ObjectID = mongoose.ObjectID

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: err })
  }
}

const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.find({ _id: id })
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${req.params.id}` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createTask = async (req, res) => {
  try {
    console.log(req.body)
    const task = await Task.create(req.body)
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findOneAndDelete({ _id: id })

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${req.params.id}` })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = { getAllTask, getTask, updateTask, createTask, deleteTask }
