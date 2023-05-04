// Array de productos - Catalogo
const productos = [
    {
        id: 1,
        nombre: "Velador Karen",
        descripcion: "Base de ceramica blanca. Pantalla de yute. Altura 45 cm",
        precio: 10900
    },
    {
        id: 2,
        nombre: "Velador Tina",
        descripcion: "Base de cemento. Pantalla de tela. Altura 45 cm",
        precio: 11900
    },
    {
        id: 3,
        nombre: "Puff natural",
        descripcion: "puff de seagrass. Medidas: 30cm x 45cm",
        precio: 19900
    },
    {
        id: 4,
        nombre: "Espejo circular",
        descripcion: "Espejo con marco de fibras naturales. Medidas: 45cm",
        precio: 12100
    },
    {
        id: 5,
        nombre: "Banquito Quito",
        descripcion: "Banco de madera de álamo. Medidas: ancho 90 cm, alto 65 cm.",
        precio: 15000
    },
    {
        id: 6,
        nombre: "Perchero Pola",
        descripcion: "Perchero y zapatero confeccionado en madera de álamo.",
        precio: 25000
    },
    {
        id: 7,
        nombre: "Lámpara hilos",
        descripcion: "Lámpara colgante confeccionada en hilos naturales",
        precio: 14000
    },
    {
        id: 8,
        nombre: "Cuadro Home",
        descripcion: "Cuadro decorativo. Medidas: 40cm x 60cm",
        precio: 15000
    },
];

// Array de productos - Carrito
const carrito = [];

// Funciones centrales

// Mostrar catalogo en consola
function mostrarCatalogo() {
    console.log("Catálogo:");
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: $${producto.precio}`);
    }
}
mostrarCatalogo();

// Calcular el total del carrito
function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach(function(producto) {
        total += producto.precio;
    });
    return total;
}


// Eliminar producto del carrito
function eliminarProductoDeCarrito(idProductoAEliminar) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProductoAEliminar) {
            carrito.splice(i, 1);
            console.log(carrito);
            alert("Producto eliminado del carrito");
            return;
        }
    }
    alert("Producto no encontrado en el carrito");
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito.splice(0, carrito.length);
    console.log(carrito);
    alert("Carrito vaciado");
}



// Agregar productos al carrito
let continuar = true;

do {
    const idProducto = parseInt(prompt("Ingresá el ID del producto que querés agregar al carrito (por ej. ingresá 1 si querés agregar un Velador Karen):\n\n" +
    productos.map(producto => `${producto.id}: ${producto.nombre}`).join("\n") +
    "\n\nEscribí '0' si terminaste de agregar.\n\n"));
    
    const carritoInfo = carrito.map(producto => `${producto.nombre} (cantidad: ${carrito.filter(p => p.id === producto.id).length})`);
    if (idProducto === 0) {
        // opciones de como continuar
        const opciones = parseInt(prompt(`El total de tu carrito es de $ ${calcularTotalCarrito()}.\n\n Productos en el carrito: \n\n ${carritoInfo.join('\n')} \n\n Elegí una opción: \n 1. Seguir agregando productos. \n 2. Continuar al pago \n 3. Eliminar un producto \n 4. Vaciar carrito \n 5. Salir \n\n`));
        switch (opciones) {
            case 1:
                break;
            case 2:
                alert("Te estamos redirigiendo al pago...");
                continuar = false;
                break;
            case 3:
                const idProductoAEliminar = parseInt(prompt("Escribí el id del producto que querés eliminar"));
                eliminarProductoDeCarrito(idProductoAEliminar);
                break;
            case 4:
                vaciarCarrito();
                break;
            case 5:
                continuar = false;
                break;
            default:
                alert("Opción inválida");
                break;
        }
    } else {
        // Buscar producto por id en el catalogo
        const productoEncontrado = productos.find((producto) => producto.id === idProducto);

        // Si se encontró el producto, agregarlo al carrito
        if (productoEncontrado) {
            carrito.push(productoEncontrado);
            alert(`Producto agregado al carrito: ${productoEncontrado.nombre}`);
            console.log(carrito);
        } else {
            alert(`No se encontró el producto con id ${idProducto}`);
        }
    }
} while (continuar);

