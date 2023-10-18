const vacio = document.querySelector('.icon-frown');
const section = document.getElementById("carrito");
const p = document.createElement("p");
const span = document.querySelector(".num");

document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito().then(
        mostrarTotal(),
        contarProductos()
    ).catch(error => {
        alert("Error al cargar el carrito:", error);
    });
});

// Método para cargar el carrito de manera asincrónica
const cargarCarrito = async () => {
    let n = localStorage.length;
    
    if (n > 0) {
        vacio.style.display = "none";
        const promises = [];

        for (let i = 0; i < n; i++) {
            const key = localStorage.key(i);
            const producto = JSON.parse(localStorage.getItem(key));
            
            if (Array.isArray(producto)) {
                producto.forEach((item) => {
                    const precioPorCantidad = item.precio * item.cantidad;
                    const articulo = document.createElement("article");
                    articulo.className = "producto";
                    articulo.id = key;
                    articulo.innerHTML = `
                        <details>
                            <summary class="precioSummary" data-precio="${precioPorCantidad}">${item.nombre}, $${precioPorCantidad}</summary>
                            <ul>
                                <li id="idProducto">${item.id}</li>
                                <li><img src="${item.imagen}" alt="${item.descripcionImg}"></li>
                                <li><p>${item.descripcion}</p></li>
                                <li class="liH"><button class="incrementarBoton" id="incrementarBoton" data-id="${item.id}">+</button></li>
                                <li class="liH"><input type="number" class="cantidad" id="cantidad" value="${item.cantidad}" min="1" readonly></li>
                                <li class="liH"><button class="decrementarBoton" id="decrementarBoton" data-id="${item.id}">-</button></li>
                                <li><button class="botonQuitar" data-id="${item.id}">Quitar del Carrito</button></li>
                            </ul>
                        </details>
                    `;
                    section.appendChild(articulo);
                });
            }
        }

        const botonesQuitar = document.querySelectorAll(".botonQuitar");
        const botonesIncrementar = document.querySelectorAll(".incrementarBoton");
        const botonesDecrementar = document.querySelectorAll(".decrementarBoton");
        const botonComprar = document.getElementById("comprar");

        botonesQuitar.forEach((botonQuitar) => {
            const idProducto = parseInt(botonQuitar.getAttribute("data-id"));
            const promise = new Promise((resolve, reject) => {
                botonQuitar.addEventListener("click", () => {
                    quitar(idProducto);
                    resolve();
                });
            });
            promises.push(promise);
        });

        botonesIncrementar.forEach((botonIncrementar) => {
            const idProducto = parseInt(botonIncrementar.getAttribute("data-id"));
            const promise = new Promise((resolve, reject) => {
                botonIncrementar.addEventListener("click", () => {
                    incrementarBoton(idProducto);
                    resolve();
                });
            });
            promises.push(promise);
        });

        botonesDecrementar.forEach((botonDecrementar) => {
            const idProducto = parseInt(botonDecrementar.getAttribute("data-id"));
            const promise = new Promise((resolve, reject) => {
                botonDecrementar.addEventListener("click", () => {
                    decrementarBoton(idProducto);
                    resolve();
                });
            });
            promises.push(promise);
        });

        botonComprar.addEventListener("click", () => {
            n = localStorage.length;
            simularPagoCarrito(n)
            .then((mensaje) => {
                alert(mensaje); // Mensaje de pago exitoso
                // Realiza acciones adicionales después del pago exitoso
            })
            .catch((error) => {
                alert(error); // Mensaje de error en el pago
                // Realiza acciones adicionales en caso de error en el pago
            });
        });

        return Promise.all(promises);
    }
    
    return Promise.resolve();

};

const simularPagoCarrito = (carrito) => {
    if(carrito > 0){
        return new Promise((resolve, reject) => {
            // Simula el proceso de pago
            setTimeout(() => {
                const exito = Math.random() < 0.8; // Simula un 80% de éxito en el pago
    
                if (exito) {
                    resolve("Pago exitoso. Gracias por su compra.");
                    localStorage.clear();
                    let articulos = section.querySelectorAll(".producto");
                    articulos.forEach(articulo => {
                        articulo.remove();
                    });
                    mostrarTotal();
                    contarProductos();
                    vacio.style.display = "block";
                } else {
                    reject("Error en el pago. Por favor, inténtelo de nuevo.");
                }
            }, 2000); // Simula un retraso de 2 segundos en el proceso de pago
        });
    }
}

//METODO MOSTRAR TOTAL
const mostrarTotal = () => {
    let summarys = document.querySelectorAll('summary');
    let precioTotal = 0.00;
    summarys.forEach(summary =>{
        let precio = parseFloat(summary.getAttribute("data-precio"));
        precioTotal += precio;
    });

    if(precioTotal != 0.00){
        p.style.display = "block";
        p.className = "precioTotal";
        p.innerHTML = `Precio total: $${precioTotal.toFixed(2)}`; //Usé toFixed(2) para asegurarme de que el precio total se muestre con dos decimales.
        section.appendChild(p);
    }
    else{
        p.style.display = "none";
    }
}
//FIN METODO MOSTRAR TOTAL

//METODO QUITAR
const quitar = (id) => {

    let n = localStorage.length;

    let key;

    for(let i = 0; i < n; i++){

        key = localStorage.key(i);

        let producto = JSON.parse(localStorage.getItem(key));

        let productoFind = producto.find(p => p.id == id);

        if(productoFind){

            localStorage.removeItem(key);

            let articulo = document.getElementById(key);

            articulo.remove();

            mostrarTotal();
            contarProductos();

            break;

        }

    }

    n = localStorage.length;

    if(n==0){
        vacio.style.display = "block";
    }
    
}
//FIN METODO QUITAR

//METODO INCREMENTAR CANTIDAD DE PRODUCTOS
const incrementarBoton = (id) => {

    let n = localStorage.length;

    let key

    for(let i = 0; i < n; i++){

        key = localStorage.key(i);

        let producto = JSON.parse(localStorage.getItem(key));

        let productoFind = producto.find(p => p.id == id);

        if(productoFind){

            productoFind.cantidad += 1;

            localStorage.setItem(key, JSON.stringify([productoFind]));

            let articulo = document.getElementById(key);

            let inputCantidad = articulo.querySelector(".cantidad");

            let cantidad = parseInt(inputCantidad.value);

            cantidad += 1;

            inputCantidad.value = cantidad;

            let precioSummary = articulo.querySelector(".precioSummary");

            let precioPorCantidad = productoFind.precio*productoFind.cantidad;

            precioSummary.textContent = `${productoFind.nombre}, $${precioPorCantidad}`

            precioSummary.setAttribute("data-precio", precioPorCantidad);

            mostrarTotal();
            contarProductos();

            break;

        }

    }

}
//FIN METODO INCREMENTAR CANTIDAD DE PRODUCTOS

//METODO DECREMENTAR CANTIDAD DE PRODUCTOS
const decrementarBoton = (id) => {

    let n = localStorage.length;

    let key

    for(let i = 0; i < n; i++){

        key = localStorage.key(i);

        let producto = JSON.parse(localStorage.getItem(key));

        let productoFind = producto.find(p => p.id == id);

        if(productoFind){

            if(productoFind.cantidad > 1){

                productoFind.cantidad -= 1;
                
                localStorage.setItem(key, JSON.stringify([productoFind]));

                let articulo = document.getElementById(key);

                let inputCantidad = articulo.querySelector(".cantidad");

                let cantidad = parseInt(inputCantidad.value);

                cantidad -= 1;

                inputCantidad.value = cantidad;

                let precioSummary = articulo.querySelector(".precioSummary");

                let precioPorCantidad = productoFind.precio*productoFind.cantidad;

                precioSummary.textContent = `${productoFind.nombre}, $${precioPorCantidad}`

                precioSummary.setAttribute("data-precio", precioPorCantidad);

                mostrarTotal();
                contarProductos();

                break;

            }

        }

    }

}
//FIN METODO DECREMENTAR CANTIDAD DE PRODUCTOS

const contarProductos = () => {
    let cantidadTotalProductos = 0;

    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
        let producto = JSON.parse(localStorage.getItem(key));
        let productoFind = producto.find(p => p.cantidad > 0);
        if (productoFind && productoFind.cantidad !== undefined) {
            cantidadTotalProductos += productoFind.cantidad;
        }
    });

    span.textContent = cantidadTotalProductos;
}
