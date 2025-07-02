const container = document.getElementById('productos-container');
const buscador = document.getElementById('buscador');
let productosGlobales = [];

// Carga inicial de productos
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    productosGlobales = data.products;
    renderizarProductos(productosGlobales);
  });

// Renderiza productos en pantalla
function renderizarProductos(productos) {
  container.innerHTML = '';

  productos.forEach(producto => {
    const tarjetaProducto = document.createElement('div');
    tarjetaProducto.classList.add('card');

    const img = document.createElement('img');
    img.src = producto.thumbnail;
    img.alt = producto.title;

    const tituloProducto = document.createElement('h3');
    tituloProducto.textContent = producto.title;

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.description.slice(0, 60) + '...';

    const precioProducto = document.createElement('p');
    precioProducto.innerHTML = `<strong>$${producto.price}</strong>`;

    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Agregar al carrito';
    btnAgregar.dataset.id = producto.id;

    btnAgregar.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
    });

    tarjetaProducto.appendChild(img);
    tarjetaProducto.appendChild(tituloProducto);
    tarjetaProducto.appendChild(descripcion);
    tarjetaProducto.appendChild(precioProducto);
    tarjetaProducto.appendChild(btnAgregar);

    container.appendChild(tarjetaProducto);
  });
}


  
// Búsqueda en tiempo real
buscador.addEventListener('input', e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = productosGlobales.filter(p =>
    p.title.toLowerCase().includes(texto) ||
    p.description.toLowerCase().includes(texto)
  );
  renderizarProductos(filtrados);
});

function agregarAlCarrito(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(producto => {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert(`${producto.title} agregado al carrito.`);
      actualizarContadorCarrito();
    });
}

// Contador del carrito en la navbar
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.getElementById('carrito-contador');
  if (contador) {
    contador.textContent = carrito.length === 0 ? '(vacío)' : `(${carrito.length})`;
  }
}

actualizarContadorCarrito();

