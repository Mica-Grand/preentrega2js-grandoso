

// Array de productos - Catalogo


const productos = [
    {
        id: 1,
        nombre: "Velador Karen",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/lampara-karen.jpeg?raw=true",
        categoria: "iluminacion",
        descripcion: "Base de ceramica blanca. Pantalla de yute. Altura 45 cm",
        precio: 10900
    },
    {
        id: 2,
        nombre: "Velador Tina",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/lampara-tina.jpeg?raw=true",
        categoria: "iluminacion",
        descripcion: "Base de cemento. Pantalla de tela. Altura 45 cm",
        precio: 11900
    },
    {
        id: 3,
        nombre: "Puff natural",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/puff.jpeg?raw=true",
        categoria: "muebles",
        descripcion: "puff de seagrass. Medidas: 30cm x 45cm",
        precio: 19900
    },
    {
        id: 4,
        nombre: "Espejo circular",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/espejo.jpeg?raw=true",
        categoria: "deco",
        descripcion: "Espejo con marco de fibras naturales. Medidas: 45cm",
        precio: 12100
    },
    {
        id: 5,
        nombre: "Banquito Quito",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/banquito.jpeg?raw=true",
        categoria: "muebles",
        descripcion: "Banco de madera de álamo. Medidas: ancho 90 cm, alto 65 cm.",
        precio: 15000
    },
    {
        id: 6,
        nombre: "Perchero Pola",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/perchero.jpeg?raw=true",
        categoria: "muebles",
        descripcion: "Perchero y zapatero confeccionado en madera de álamo.",
        precio: 25000
    },
    {
        id: 7,
        nombre: "Lámpara hilos",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/lampara-hilos.jpeg?raw=true",
        categoria: "iluminacion",
        descripcion: "Lámpara colgante confeccionada en hilos naturales",
        precio: 14000
    },
    {
        id: 8,
        nombre: "Cuadro Home",
        imagen: "https://github.com/Mica-Grand/preentrega2js-grandoso/blob/main/img/cuadro.jpeg?raw=true",
        categoria: "deco",
        descripcion: "Cuadro decorativo. Medidas: 40cm x 60cm",
        precio: 15000
    },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


document.addEventListener("DOMContentLoaded", function () {

    // Mostrar productos en catalogo

    const contador = document.querySelector("#contadorCarrito");
    function actualizarContador () {
        console.log(carrito.length);
        contador.innerText = carrito.length;
    }

    actualizarContador();

    const contenedorTarjetas = document.querySelector("#contenedor-tarjetas");
    let filaTarjetas = document.createElement("div");
    filaTarjetas.classList.add("row", "gx-0", "gy-3");
    contenedorTarjetas.appendChild(filaTarjetas);


    function mostrarProductos() {
        productos.forEach((producto, index) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta", "col-md-6", "col-lg-4", "col-xl-3", "p-2", "text-center");


            const imagenTarjeta = document.createElement("div");
            imagenTarjeta.classList.add("tarjeta-img", "img-thumbnail", "position-relative");
            imagenTarjeta.innerHTML = `
                <img src="${producto.imagen}" class="w-100">
            `;
            tarjeta.appendChild(imagenTarjeta);


            const textoTarjeta = document.createElement("div");
            textoTarjeta.classList.add("tarjeta-texto", "text-center");
            textoTarjeta.innerHTML = `
                <p class="text-capitalize my-1">${producto.nombre}</p>
                <span class="tarjeta-precio fw-bold">$${producto.precio}</span>
            `;
            tarjeta.appendChild(textoTarjeta);


            const botonAgregar = document.createElement("button");
            botonAgregar.classList.add("tarjeta-boton", "btn", "m-2", "text-dark");
            botonAgregar.innerText = "Agregar al carrito";
            botonAgregar.setAttribute("data-producto-id", producto.id);
            tarjeta.appendChild(botonAgregar);


            botonAgregar.addEventListener("click", () => {
                agregarCarrito(producto);
            });


            filaTarjetas.appendChild(tarjeta);
        });
    }


    mostrarProductos();


    function agregarCarrito(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad++;
            productoExistente.precio += producto.precio;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: producto.precio * 1,
                cantidad: 1
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(carrito);
        actualizarContador();
    }


    // Busqueda

    const btnBuscar = document.querySelector("#btn-buscar");
    const inputBuscar = document.querySelector("#input-buscar");
    const filaTarjetasResultado = document.querySelector(".fila-tarjetas-resultado");
    const modal = new bootstrap.Modal(document.querySelector("#modalBusqueda"), {});

    btnBuscar.addEventListener("click", () => {
        const busqueda = inputBuscar.value.toLowerCase();
        let resultadosBusqueda = productos.filter((producto) => {
            return producto.nombre.toLowerCase().includes(busqueda);
        });
        console.log(resultadosBusqueda);
        mostrarResultadosBusqueda(resultadosBusqueda);
        modal.show();
    });

    function mostrarResultadosBusqueda(resultados) {
        filaTarjetasResultado.innerHTML = "";
        resultados.forEach((producto, index) => {
            const tarjetaResultado = document.createElement("div");
            tarjetaResultado.classList.add(
                "tarjeta",
                "col-md-6",
                "col-lg-4",
                "col-xl-3",
                "p-2",
                "text-center"
            );

            const imagenTarjetaResultado = document.createElement("div");
            imagenTarjetaResultado.classList.add(
                "tarjeta-img",
                "img-thumbnail",
                "position-relative"
            );
            imagenTarjetaResultado.innerHTML = `
            <img src="${producto.imagen}" class="w-100">
        `;
            tarjetaResultado.appendChild(imagenTarjetaResultado);

            const textoTarjetaResultado = document.createElement("div");
            textoTarjetaResultado.classList.add("tarjeta-texto", "text-center");
            textoTarjetaResultado.innerHTML = `
            <p class="text-capitalize my-1">${producto.nombre}</p>
            <span class="tarjeta-precio fw-bold">$${producto.precio}</span>
        `;
            tarjetaResultado.appendChild(textoTarjetaResultado);

            const botonAgregar = document.createElement("button");
            botonAgregar.classList.add(
                "tarjeta-resultados-boton",
                "btn",
                "m-2",
                "text-dark"
            );
            botonAgregar.innerText = "Agregar al carrito";
            botonAgregar.setAttribute("data-producto-id", producto.id);
            botonAgregar.addEventListener("click", () => {
                agregarDesdeModal(producto);
                actualizarContador();
            });
            tarjetaResultado.appendChild(botonAgregar);
            filaTarjetasResultado.appendChild(tarjetaResultado);
        });
    }

    function agregarDesdeModal(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad++;
            productoExistente.precio += producto.precio;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: producto.precio * 1,
                cantidad: 1
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(carrito);
        actualizarContador();
    }

})


document.addEventListener("DOMContentLoaded", function () {
    const carritoVacio = document.querySelector("#carritoVacio");
    const carritoVacioDiv = document.createElement("div");
    carritoVacioDiv.setAttribute("class", "card m-auto");
    carritoVacioDiv.innerHTML = `
        <div class="card-body text-center">
            <h3 class="card-title py-3 mt-3">Carrito vacío</h3>
            <p class="card-text py-3 mb-3">Agrega productos a tu carrito para comenzar a comprar</p>
        </div>
    `;
    const contenedorCarrito = document.querySelector("#contenedorCarrito");
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const totalCarrito = document.querySelector("#totalCarrito");
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-carrito", "text-center");
    totalCarrito.appendChild(totalDiv);

    const botonesDiv = document.createElement("div");
    botonesDiv.classList.add("btn-group", "gap-2", "mt-3");
    totalCarrito.appendChild(botonesDiv);

    const botonVaciar = document.createElement("button");
    botonVaciar.classList.add("btn", "btn-primary");
    botonVaciar.innerText = "Vaciar carrito";
    botonesDiv.appendChild(botonVaciar);
    botonVaciar.addEventListener("click", limpiarCarrito);

    const botonComprar = document.createElement("button");
    botonComprar.classList.add("btn", "btn-success");
    botonComprar.innerText = "Comprar";
    botonesDiv.appendChild(botonComprar);
    botonComprar.addEventListener("click", comprarProductos);


    if (!carrito || carrito.length === 0) {
        console.log("El carrito está vacío.")
        totalCarrito.style.display = "none";
        carritoVacio.appendChild(carritoVacioDiv);
    } else {
        totalCarrito.style.display = "block";
        mostrarCarrito();

    }


    function mostrarCarrito() {
        contenedorCarrito.innerHTML = "";
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.forEach((producto) => {
            const productoHTML = document.createElement("div");
            productoHTML.classList.add("producto", "card", "mb-3", "border", "shadow-sm", "d-flex", "align-items-center");
            productoHTML.innerHTML = `
            <img class="card-img-top img-fluid img-thumbnail" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-body text-center">
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-text">Cantidad: ${producto.cantidad}</p>
                <p class="card-text">Precio: $${producto.precio}</p>
            </div>
        `;
            contenedorCarrito.appendChild(productoHTML);


            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("boton-eliminar", "btn", "m-2", "text-dark");
            botonEliminar.innerText = "Eliminar";
            botonEliminar.setAttribute("data-producto-id-eliminar", producto.id);


            productoHTML.appendChild(botonEliminar);


            botonEliminar.addEventListener("click", () => {
                eliminarProductoDeCarrito(producto.id);

            });
        });
    }

    function limpiarCarrito() {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarTotal();
        const carritoLimpio = document.querySelector("#contenedorCarrito");
        carritoLimpio.innerHTML = "";
    }

    const modalCompraDiv = document.querySelector("#modalCompra")
    const modalCompra = new bootstrap.Modal(modalCompraDiv);
    function comprarProductos() {
        console.log("¡Gracias por tu compra!")
        modalCompra.show()
        const medioPagoSelect = document.getElementById("medioPago");
        const cuotasDiv = document.getElementById("divCuotas");
        cuotasDiv.classList.add("ocultar");
        medioPagoSelect.addEventListener("change", function () {
            if (medioPagoSelect.value === "credito") {
                cuotasDiv.classList.remove("ocultar");
            } 
        });
    }



    // Eliminar productos

    function eliminarProductoDeCarrito(idProducto) {
        carrito = carrito.filter((producto) => producto.id !== idProducto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarTotal();
        mostrarCarrito();
        actualizarContador();
    }

    mostrarCarrito();


    // Calcular total
    function calcularTotal() {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        return carrito.reduce((total, producto) => total + producto.precio, 0);
    }


    let total = calcularTotal();
    console.log(total);
    totalDiv.innerText = `Total: $${total}`;

    // Actualizar total
    function actualizarTotal() {
        let totalActualizado = 0;
        carrito.forEach((producto) => {
            totalActualizado += producto.precio * producto.cantidad;
        });
        total = totalActualizado;
        totalDiv.innerText = `Total: $${totalActualizado}`;
    }

})

