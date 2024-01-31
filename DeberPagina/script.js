// scripts.js

function mostrarCarrito() {

    let carrito = obtenerCarritoDesdeMemoria();

    let carritoLista = document.getElementById('carrito-lista');

    carritoLista.innerHTML = '';

    carrito.forEach(producto => {
        let itemCarrito = document.createElement('div');
        itemCarrito.className = 'item-carrito';

        itemCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
        `;

        carritoLista.appendChild(itemCarrito);
    });

    actualizarTotal();
}

function actualizarTotal() {
    let carrito = obtenerCarritoDesdeMemoria();

    let total = carrito.reduce((suma, producto) => suma + (producto.cantidad * producto.precio), 0);

    document.getElementById('total-precio').textContent = `$${total.toFixed(2)}`;
}

function vaciarCarrito() {
    vaciarMemoriaDelCarrito();

    mostrarCarrito();
}

function comprar() {
    let carrito = obtenerCarritoDesdeMemoria();
    if (carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Tu carrito esta vacio",
          });
        return;
    }
    Swal.fire({
        title: "Esta seguro que desea realizar la compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si comprar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Compra Realizada!",
            text: "Su factura sera enviada a su email",
            icon: "success"
          });
          vaciarCarrito();
        }
      });

    
}


function eliminarDelCarrito(nombreProducto) {
    let carrito = obtenerCarritoDesdeMemoria();
    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    guardarCarritoEnMemoria(carrito);
    mostrarCarrito();
}

function obtenerCarritoDesdeMemoria() {
    let carritoString = localStorage.getItem('carrito');
    return carritoString ? JSON.parse(carritoString) : [];
}

function guardarCarritoEnMemoria(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarMemoriaDelCarrito() {
    localStorage.removeItem('carrito');
}

window.onload = mostrarCarrito;



function agregarAlCarrito(articulo, precio) {
    let carrito = obtenerCarritoDesdeMemoria();

    let productoExistente = carrito.find(producto => producto.nombre === articulo);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        let nuevoProducto = {
            nombre: articulo,
            cantidad: 1, 
            precio: precio, 
            imagen: obtenerImagen(articulo) 
        };

        carrito.push(nuevoProducto);
    }


    guardarCarritoEnMemoria(carrito);

    Swal.fire({
            icon: 'success',
            title: 'Añadido al carrito',
            text: `${articulo} se ha añadido a tu carrito de compras.`,
        });

    mostrarCarrito();
}


function obtenerImagen(articulo) {
    return `${articulo.toLowerCase().replace(/\s+/g, '_')}.jpg`;
}

function enviarFormulario(){
    Swal.fire({
        icon: 'success',
        title: 'Contacto Enviado',
        text: 'Su contacto se ha enviado correctamente',
    });
}
