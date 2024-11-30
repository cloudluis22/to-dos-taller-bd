import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaRegStickyNote } from "react-icons/fa";
const MySwal = withReactContent(Swal);
  const NuevaTarea = async (tareasArray, setTareasArray) => {
    const { value: formValues } = await MySwal.fire({
      title: "Crea una Nueva Tarea 📝" ,
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título">
        <textarea id="swal-text" class="swal2-textarea" placeholder="Coloca aquí los detalles de tu tarea"></textarea>
        <label for="swal-date"> ¿Cuándo deseas terminar tu tarea? </label>
        <input id="swal-date" type="date" class="swal2-input">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const titulo = document.getElementById("swal-title").value;
        const contenido = document.getElementById("swal-text").value;
        const fecha_fin = document.getElementById("swal-date").value;

        if (!titulo || !contenido || !fecha_fin) {
          Swal.showValidationMessage("Por favor, completa todos los campos.");
        }
        return { titulo, contenido, fecha_fin };
      },
    });

    if (formValues) {
      try {
        // Llamada a API
        const response = await fetch("http://localhost:8080/nueva_tarea", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        MySwal.fire("¡Éxito!", "La tarea se envió correctamente.", "success");
        setTareasArray([...tareasArray, {
          Titulo: formValues.titulo,
          Contenido: formValues.contenido,
          Fecha_Fin: formValues.fecha_fin,
        }])
      } catch (error) {
        MySwal.fire("Error", error.message, "error");
      }
    }
};

export default NuevaTarea;