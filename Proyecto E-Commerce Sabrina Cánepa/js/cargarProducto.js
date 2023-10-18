const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const span = document.querySelector(".num");

const idProducto = urlParams.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        contarProductos();

        const response = await fetch("../productos.json");
        const data = await response.json();

        const productos = data.productos;
        const section = document.getElementById("productos");

        productos.forEach((producto) => {
            if (producto.id == idProducto) {
                const articulo = document.createElement("article");
                articulo.className = "producto";
                articulo.innerHTML = `
                    <ul>
                        <li id="idProducto">${producto.id}</li>
                        <li><img src="${producto.imagen}" alt="${producto.descripcionImg}" id="img"></li>
                        <li><p id="nombre">${producto.nombre}</p></li>
                        <li><p id="descripcion">${producto.descripcion2}</p></li>
                        <li><p id="precio">${producto.precio}</p></li>
                        <li><button class="botonAgregar">Agragar al Carrito</button></li>  
                    </ul>
                `;
                section.appendChild(articulo);
            }
        });

        const botonAgregar = document.querySelector(".botonAgregar");
        botonAgregar.addEventListener("click", () => {
            agregar().then(() => {
                console.log("Producto agregado con éxito");
            }).catch((error) => {
                console.error("Error al agregar el producto:", error);
            });
        });

    } catch (error) {
        alert("Error al cargar los productos:", error);
    }
});

const agregar = async () => {
    try {
        const id = parseInt(document.getElementById("idProducto").textContent);
        const img = document.getElementById('img');
        const imgSrc = img.getAttribute("src");
        const imgAlt = img.getAttribute("alt");
        const nombre = document.getElementById("nombre").textContent;
        const descripcion = document.getElementById("descripcion").textContent;
        const cantidad = 1;
        const precio = parseFloat(document.getElementById("precio").textContent);
        
        const producto = [
            {
                "id": id,
                "nombre": nombre,
                "descripcion": descripcion,
                "imagen": imgSrc,
                "descripcionImg": imgAlt,
                "precio": precio,
                "cantidad": cantidad
            }
        ];

        let n = localStorage.length;
        let key;
        let productoExiste = false;

        if (n > 0) {
            for (let i = 0; i < n; i++) {
                key = localStorage.key(i);
                let productoLocalStorage = JSON.parse(localStorage.getItem(key));
                let productoLocalStorageAct = productoLocalStorage.find(item => item.id == id);

                if (productoLocalStorageAct) {
                    productoExiste = true;
                    break;
                }
            }
        }

        if (!productoExiste) {
            localStorage.setItem("producto" + n, JSON.stringify(producto));
            contarProductos();
        }
    } catch (error) {
        throw error;
    }
};

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