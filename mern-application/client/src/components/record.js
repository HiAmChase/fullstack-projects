import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Record = (props) => {
  return (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.position}</td>
      <td>{props.record.level}</td>
      <td>
        <Link className='btn btn-link' to={`edit/${props.record._id}`}>
          Edit
        </Link>
        <button
          className='btn btn-link'
          onClick={() => {
            props.deleteRecord(props.record._id)
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Record
