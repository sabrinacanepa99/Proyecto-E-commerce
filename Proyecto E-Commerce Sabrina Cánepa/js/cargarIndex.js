const span = document.querySelector(".num");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        contarProductos();

        const data = await cargarProductos("../productos.json");
        const productos = data.productos;
        const section = document.getElementById("productos");

        productos.forEach((producto) => {
            const articulo = document.createElement("article");
            articulo.className = "producto";
            articulo.innerHTML = `
                <ul>
                    <li id="idProducto">${producto.id}</li>
                    <li><img src="${producto.imagen}" alt="${producto.descripcionImg}"></li>
                    <li><p>${producto.nombre}</p></li>
                    <li><p>${producto.descripcion}</p></li>
                    <li><p>$${producto.precio}</p></li>
                    <li><a href="producto.html?id=${producto.id}">Ver más</a></li>
                </ul>
            `;

            section.appendChild(articulo);
        });
    } catch (error) {
        alert('Error al obtener los datos de productos: ' + error);
    }
});

// Función para cargar los productos desde un archivo JSON
const cargarProductos = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar los productos: ${response.status}`);
        }
        return await response.json();
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