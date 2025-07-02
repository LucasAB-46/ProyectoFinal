const container = document.getElementById('carrito-container');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderizarCarrito() {
  container.innerHTML = '';

  if (carrito.length === 0) {
    container.innerHTML = '<p>El carrito está vacío.</p>';
    actualizarContadorCarrito();
    return;
  }

  carrito.forEach((producto, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>$${producto.price}</p>
      <button class="eliminar" data-index="${index}">❌ Eliminar</button>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = e.target.getAttribute('data-index');
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarrito();
    });
  });

  actualizarContadorCarrito();
}

document.getElementById('vaciar').addEventListener('click', () => {
  localStorage.removeItem('carrito');
  carrito = [];
  renderizarCarrito();
});

document.getElementById('finalizar').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('El carrito ya está vacío.');
    return;
  }

  alert('¡Gracias por tu compra!');
  localStorage.removeItem('carrito');
  window.location.href = 'index.html';
});

function actualizarContadorCarrito() {
  const contador = document.getElementById('carrito-contador');
  if (contador) {
    contador.textContent = carrito.length === 0 ? '(vacío)' : `(${carrito.length})`;
  }
}

renderizarCarrito();
