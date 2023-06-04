

// Solicitar array de productos - Catalogo

let productos = [];

const pedirProductos = async () => {
    let resp = await fetch("productos.json");
    productos = await resp.json();
};


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


document.addEventListener("DOMContentLoaded", function () {


    // Que se actualice el numerito de cantidad de productos en carrito

    const contador = document.querySelector("#contadorCarrito");
    function actualizarContador() {
        let totalCantidad = 0;
        for (let i = 0; i < carrito.length; i++) {
            totalCantidad += carrito[i].cantidad;
        }
        contador.innerText = totalCantidad;
    }

    actualizarContador();


    // Mostrar productos en catalogo (con y sin filtro)

    const contenedorTarjetas = document.querySelector("#contenedor-tarjetas");
    let filaTarjetas = document.createElement("div");
    filaTarjetas.classList.add("row", "gx-0", "gy-3");
    contenedorTarjetas.appendChild(filaTarjetas);

    async function mostrarProductos(filtro) {
        await pedirProductos();

        filaTarjetas.innerHTML = "";

        productos = productos.filter((producto) => {
            return filtro === "todo" || producto.categoria === filtro;
        })

        productos.forEach((producto) => {
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
            botonAgregar.classList.add("tarjeta-boton", "btn", "m-2", "mx-auto", "text-dark", "text-center", "d-flex", "align-items-center");
            botonAgregar.innerHTML = `<p class="m-auto"><i class="bi bi-cart-plus me-2"></i>Agregar al carrito</p>`;
            botonAgregar.setAttribute("data-producto-id", producto.id);
            tarjeta.appendChild(botonAgregar);


            botonAgregar.addEventListener("click", () => {
                swal({
                    title: "¡Producto agregado!",
                    text: `Agregaste el producto ${producto.nombre} al carrito`,
                    icon: "success",
                    buttons: false,
                    timer: 1500,

                });
                agregarCarrito(producto);
            });


            filaTarjetas.appendChild(tarjeta);
        });
    };


    mostrarProductos("todo");

    const botonesFiltro = document.querySelectorAll(".filtro");

    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach((boton) => {
                boton.classList.remove("active-filter-btn");
            });
            boton.classList.add("active-filter-btn");

            const filtro = boton.getAttribute("data-filtro");
            mostrarProductos(filtro);
        });
    });


    // Agregar al carrito

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
        actualizarContador();
    }


    // Busqueda (

    const btnBuscar = document.querySelector("#btn-buscar");
    const inputBuscar = document.querySelector("#input-buscar");
    const filaTarjetasResultado = document.querySelector(".fila-tarjetas-resultado");
    const modal = new bootstrap.Modal(document.querySelector("#modalBusqueda"), {});

    btnBuscar.addEventListener("click", () => {
        const busqueda = inputBuscar.value.toLowerCase();
        let resultadosBusqueda = productos.filter((producto) => {
            return producto.nombre.toLowerCase().includes(busqueda);
        });
        resultadosBusqueda.length === 0
            ? mostrarMensajeNoEncontrado()
            : mostrarResultadosBusqueda(resultadosBusqueda);
        modal.show();
    });

    function mostrarMensajeNoEncontrado() {
        filaTarjetasResultado.innerHTML = "";
        const sinResultados = document.createElement("div");
        sinResultados.setAttribute("class", "card m-auto");
        sinResultados.innerHTML = `
            <div class="card-body text-center">
                <h3 class="card-title py-3 mt-3">No se encontraron resultados para tu búsqueda</h3>
                <p class="card-text py-3 mb-3">Probá con otra palabra clave o explorá nuestro catálogo por categorías</p>
            </div>
        `;
        filaTarjetasResultado.appendChild(sinResultados)

    }

    function mostrarResultadosBusqueda(resultados) {
        filaTarjetasResultado.innerHTML = "";
        resultados.forEach((producto, index) => {
            const tarjetaResultado = document.createElement("div");
            tarjetaResultado.classList.add(
                "tarjeta",
                "col-12",
                "p-2",
                "text-center"
            );

            const imagenTarjetaResultado = document.createElement("div");
            imagenTarjetaResultado.classList.add(
                "tarjeta-img",
                "img-thumbnail",
                "position-relative",
            );
            imagenTarjetaResultado.innerHTML = `
            <img src="${producto.imagen}" class="w-100 h-100">
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
                swal({
                    title: "¡Producto agregado!",
                    text: `Agregaste el producto ${producto.nombre} al carrito`,
                    icon: "success",
                    buttons: false,
                    timer: 1500,
                });
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



    // Newsletter

    const inputNewsNombre = document.querySelector(".news-nombre");
    const inputNewsMail = document.querySelector(".news-mail");
    const btnSuscribirse = document.querySelector(".suscribirse");


    btnSuscribirse.addEventListener("click", () => {
        const nombreSuscriptor = inputNewsNombre.value;
        if (inputNewsNombre.value === "" || inputNewsMail.value === "") {
            swal({
                title: "Error",
                text: "Ingresá un nombre e email válidos",
                icon: "error",
                buttons: {
                    confirm : {text:'Ok',className:"sweet-confirm"},
                }

            })
        } else {

            swal({
                title: `¡Gracias por suscribirte, ${nombreSuscriptor}!`,
                text: "Te agregamos a nuestra lista de suscriptores y pronto recibirás nuestras novedades.",
                icon: "success",
                buttons: {
                    confirm : {text: "¡Genial!",className:"sweet-confirm"},
                }            
            });
        }

    })



})




// Carrito

document.addEventListener("DOMContentLoaded", function () {

    // mensaje carrito vacio

    const carritoVacio = document.querySelector("#carritoVacio");
    const carritoVacioDiv = document.createElement("div");
    carritoVacioDiv.setAttribute("class", "card m-auto");
    function mostrarMensajeCarritoVacio() {
        carritoVacioDiv.innerHTML = `
        <div class="card-body text-center">
            <h3 class="card-title py-3 mt-3">El carrito está vacío</h3>
            <p class="card-text py-3 mb-3">Agregá productos para comenzar a comprar</p>
        </div>
        <span class="text-center">
            <button class="btn btn-primary btn-ver text-center mb-3" id="btnVerProductos">Ir a comprar</button>
        </span>
        `;
        totalCarrito.style.display = "none";
        carritoVacio.appendChild(carritoVacioDiv);
        const botonIrAComprar = document.querySelector("#btnVerProductos");
        botonIrAComprar.addEventListener("click", () => {
            window.location.href = "index.html#catalogo"; 
        });
    }

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
    botonVaciar.addEventListener("click", () => {
        swal({
            title: "¿Seguro querés hacer esto?",
            text: "Esta acción eliminará todos los productos del carrito.",
            icon: "warning",
            // buttons: ["Cancelar", "Aceptar"],
            buttons: {
                confirm : {text:"Sí",className:"sweet-confirm"},
                cancel : "Cancelar",
            }
        }).then((value) => {
            if (value === true) {
                limpiarCarrito();
                mostrarMensajeCarritoVacio();
            }
        });
    });

    const botonComprar = document.createElement("button");
    botonComprar.classList.add("btn", "btn-success");
    botonComprar.innerText = "Iniciar compra";
    botonesDiv.appendChild(botonComprar);
    botonComprar.addEventListener("click", comprarProductos);


    if (!carrito || carrito.length === 0) {
        totalCarrito.style.display = "none";
        mostrarMensajeCarritoVacio();
    } else {
        totalCarrito.style.display = "block";
        mostrarCarrito();

    }


    // mostrar los productos agregados al carrito

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
                <p class="card-text">Precio: $${producto.precio*producto.cantidad}</p>
            </div>
        `;
            contenedorCarrito.appendChild(productoHTML);



            // Botones de aumentar y disminuir cantidad

            const contenedorCantidad = document.createElement("div");
            contenedorCantidad.classList.add("contenedor-cantidad");
            
            const botonDisminuir = document.createElement("button");
            botonDisminuir.classList.add("boton-disminuir", "m-2");
            botonDisminuir.innerHTML = `<i class="bi bi-dash"></i>`;
            botonDisminuir.setAttribute("data-producto-id-disminuir", producto.id);
            contenedorCantidad.appendChild(botonDisminuir);
            
            const cantidadProducto = document.createElement("span");
            cantidadProducto.classList.add("cantidad-producto");
            cantidadProducto.textContent = producto.cantidad;
            contenedorCantidad.appendChild(cantidadProducto);
            
            const botonAumentar = document.createElement("button");
            botonAumentar.classList.add("boton-aumentar", "m-2");
            botonAumentar.innerHTML = `<i class="bi bi-plus"></i>`;
            botonAumentar.setAttribute("data-producto-id-aumentar", producto.id);
            contenedorCantidad.appendChild(botonAumentar);
            
            productoHTML.appendChild(contenedorCantidad);

            botonDisminuir.addEventListener("click", () => {
                const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const productoActualizado = carrito.find(item => item.id === producto.id);
                if (productoActualizado && productoActualizado.cantidad > 1) {
                    productoActualizado.cantidad--;
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    mostrarCarrito();
                    actualizarTotal();
                }
            });

            botonAumentar.addEventListener("click", () => {
                const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const productoActualizado = carrito.find(item => item.id === producto.id);
                if (productoActualizado) {
                    productoActualizado.cantidad++;
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    mostrarCarrito();
                    actualizarTotal();
                }
            });

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("boton-eliminar", "btn", "m-2", "text-dark");
            botonEliminar.innerHTML = `<p class="m-auto"><i class="bi bi-trash3 me-2"></i>Eliminar</p>`;
            botonEliminar.setAttribute("data-producto-id-eliminar", producto.id);
            productoHTML.appendChild(botonEliminar);

            botonEliminar.addEventListener("click", () => {
                swal({
                    title: "¡Producto eliminado!",
                    text: `Eliminaste el producto ${producto.nombre} del carrito`,
                    icon: "success",
                    buttons: false,
                    timer: 1500,
                });
                eliminarProductoDeCarrito(producto.id);
            });
        });
    }


    // Vaciar carrito

    function limpiarCarrito() {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarTotal();
        const carritoLimpio = document.querySelector("#contenedorCarrito");
        carritoLimpio.innerHTML = "";
    }


    // Modal de boton Iniciar compra

    const modalCompraDiv = document.querySelector("#modalCompra")
    const modalCompra = new bootstrap.Modal(modalCompraDiv);
    function comprarProductos() {
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

    const confirmarCompra = document.querySelector("#btnConfirmarCompra");
    confirmarCompra.addEventListener("click", () => {

        modalCompra.hide()

        swal({
            content: {
                element: "img",
                attributes: {
                src: "img/Loading_icon.gif",
                }},
            title: "Te vamos a redirigir al pago",
            text: "Ya falta poco para que puedas renovar tu casa",
            buttons: {
                cancel : "Sacame de acá",
                confirm : {text:"¡Vamos!",className:"sweet-confirm"},
            },
            reverseButtons: true,
        });
    });



    // Eliminar productos 

    function eliminarProductoDeCarrito(idProducto) {
        carrito = carrito.filter((producto) => producto.id !== idProducto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = "";
            mostrarMensajeCarritoVacio();
            actualizarContador();
        } else {
            actualizarTotal();
            mostrarCarrito();
            actualizarContador();

        }
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


