import React from 'react'
import { Card } from 'react-bootstrap';
import { FaCheck } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


const Tarea = ({ titulo, contenido,  fecha}) => {
  return (
    <Card className="mb-3 bg-light">
      <Card.Header className='d-flex flex-row fw-bold fs-5'> { titulo } <FaCheck className='tarea__check' /> </Card.Header>
      <Card.Body>
        <Card.Text>{ contenido }</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className='d-flex flex-row'>
          <span> Finalizar para el: <b> { fecha } </b>  </span>
          <MdEditSquare className='tarea__options tarea__options__edit' />
          <MdDeleteForever className='tarea__options tarea__options__delete' />
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Tarea