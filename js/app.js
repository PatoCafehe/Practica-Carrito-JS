// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEvenListeners();
function cargarEvenListeners() {
	//Cuando agregas un curso al carrito presionando "Agregar al Carrito"
	listaCursos.addEventListener('click', agregarCurso);

	//Elimina cursos del carrito
	carrito.addEventListener('click', eliminarCurso);

	//Vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		articulosCarrito = []; // Reseteamos el arreglo

		limpiarHTML(); // Eliminamos todo el HTML
	});
}

// Funciones

function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;

		leerDatosCursos(cursoSeleccionado);
	}
}

//Elimina un curso del carrito
function eliminarCurso(e) {
	if (e.target.classList.contains('borrar-curso')) {
		const cursoId = e.target.getAttribute('data-id');

		//Elimina del arreglo artCarrito por el data-id
		articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

		carritoHTML(); //Volvemos a imprimir el HTML actualizado
	}
}

// Lee el contenido del HTML y extrae la información del curso
function leerDatosCursos(curso) {
	//console.log(curso);
	// Crear un objeto con el contenido del curso actual
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	//Si ya existe un articulo igual modifica la cantidad
	const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
	if (existe) {
		//Actualizamos la cantidad
		const cursos = articulosCarrito.map((curso) => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso; // Retorna el curso actualizado
			} else {
				return curso; // Retorna los objetos que no son duplicados
			}
		});
		articulosCarrito = [...cursos];
	} else {
		articulosCarrito = [...articulosCarrito, infoCurso];
		//console.log(articulosCarrito);
	}

	carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
	// Limpiar el HTML
	limpiarHTML();
	// Recorre el carrito y genera el HTML
	articulosCarrito.forEach((curso) => {
		const row = document.createElement('tr');
		const { imagen, titulo, precio, cantidad, id } = curso;
		row.innerHTML = `
            <td>
                <img src=${imagen} width="100"
            </td>
            <td>${titulo}</td>
            <td>${precio} </td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a>
            </td>
        `;
		contenedorCarrito.appendChild(row);
	});
}

// Elimina los cursos del tbody
function limpiarHTML() {
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}
