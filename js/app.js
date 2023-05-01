// Array de productos - Catalogo
const catalogo = [
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
    for (let i = 0; i < catalogo.length; i++) {
        const producto = catalogo[i];
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio}`);
    }
}
mostrarCatalogo();

// Calcular el total del carrito
function calcularTotalCarrito() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }
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
    const idProducto = parseInt(prompt("Mirá el catálogo por consola. Luego, escribí el ID del producto que querés agregar al carrito. \n Escribi '0' si terminaste de agregar."));
    const carritoInfo = carrito.map(producto => `${producto.nombre} (cantidad: ${carrito.filter(p => p.id === producto.id).length})`);
    if (idProducto === 0) {
        // Dar opciones de como continuar
        const opciones = parseInt(prompt(`El total de tu carrito es de $ ${calcularTotalCarrito()}.\n Productos en el carrito:\n ${carritoInfo.join('\n')} \n Elegí una opción: \n 1. Continuar al pago \n 2. Eliminar un producto \n 3. Vaciar carrito`));
        switch (opciones) {
            case 1:
                alert("Te estamos redirigiendo al pago...");
                continuar = false;
                break;
            case 2:
                const idProductoAEliminar = parseInt(prompt("Escribí el id del producto que querés eliminar"));
                eliminarProductoDeCarrito(idProductoAEliminar);
                break;
            case 3:
                vaciarCarrito();
                break;
            default:
                alert("Opción inválida");
                break;
        }
    } else {
        // Buscar producto por id en el catalogo
        const productoEncontrado = catalogo.find(producto => producto.id === idProducto);

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

