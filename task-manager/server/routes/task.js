const express = require('express')
const router = express.Router()
const {
  getAllTask,
  getTask,
  updateTask,
  createTask,
  deleteTask,
} = require('../controller/task')

router.route('/').get(getAllTask).post(createTask)
router.route('/:id').post(updateTask).delete(deleteTask).get(getTask)

//router.route('/task').get()   -- get all task
//router.route('/task').post()  -- create
//router.route('/task/:id').patch()  -- update
//router.route('/task/:id').delete() -- delete
//router.route('/task/:id').get()    -- get single task

module.exports = router
