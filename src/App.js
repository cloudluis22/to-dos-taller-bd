import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Tarea from './Components/Tarea';
import { useEffect, useState } from 'react';
import NuevaTarea from './Modules/NuevaTarea';
import useFetch from './Hooks/useFetch';

function App() {

  const [tareasArray, setTareasArray] = useState([]);
  const { loading, data, error } = useFetch('http://localhost:8080/tareas');
  
  useEffect(() => {
    if(data) {
      setTareasArray(data)
    }
  }, [data])

  return (
    
    <div>
      <h1 className='text-center'>
        Lista de Tareas
      </h1>

      <div className='d-flex justify-content-center'>
        <Button variant='success' size='lg' onClick={() => { NuevaTarea(tareasArray, setTareasArray) }}> Agregar Nueva Tarea </Button>
      </div>

      <Container fluid>
      <Row className='px-5'>
        <Col md={5} className="d-flex flex-column align-items-center not-done pt-3 border border-dark">
          <h3 className='mb-4'> Tareas no Completadas </h3>
          {  
            tareasArray.map((tarea) => (
              <Tarea
                titulo={tarea.Titulo}
                contenido={tarea.Contenido}
                fecha={tarea.Fecha_Fin.substring(0, 10)}
             />
            ))
          }

        </Col>
        <Col md={2}>
        </Col>
        <Col md={5} className="d-flex flex-column align-items-center done pt-3 border border-dark">
          <h3 className='mb-4'> Tareas Completadas </h3>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
