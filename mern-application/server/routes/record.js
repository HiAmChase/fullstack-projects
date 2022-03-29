const express = require('express')
const router = express.Router()

// connect to database
const dbo = require('../db/conn')

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId

// Get list of all the records
router.route('/record').get((req, res) => {
  let db_connect = dbo.getDb()
  db_connect
    .collection('records')
    .find({})
    .toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
})

// Get single record
router.route('/record/:id').get((req, res) => {
  let db_connect = dbo.getDb()
  let myQuery = { _id: ObjectId(req.params.id) }
  db_connect.collection('records').findOne(myQuery, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// Create record
router.route('/record/add').post((req, res) => {
  let db_connect = dbo.getDb()
  let myObj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  }

  db_connect.collection('records').insertOne(myObj, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// Update record
router.route('/update/:id').post((req, res) => {
  let db_connect = dbo.getDb()
  let myQuery = { _id: ObjectId(req.params.id) }
  let newValues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  }

  db_connect
    .collection('records')
    .updateOne(myQuery, newValues, (err, result) => {
      if (err) throw err
      console.log('1 document updated')
      res.json(result)
    })
})

// Delete record
router.route('/:id').delete((req, res) => {
  let db_connect = dbo.getDb()
  let myQuery = { _id: ObjectId(req.params.id) }

  db_connect.collection('records').deleteOne(myQuery, (err, result) => {
    if (err) throw err
    console.log(result)
    console.log('1 document deleted')
    res.json(result)
  })
})

module.exports = router
