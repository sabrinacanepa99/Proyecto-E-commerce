--Sabrina Cánepa--

Mi E-Commerce es sobre calzado, la idea surgio viendo imagenes de estos en Pinterest y elegí los que más me gustaron. Pense en un incio que contenga todos los productos separados por categorias, cada categoria tendria su propia página, pero por complicaciones no lo pude realizar. Cambie de ídea y deje todos los productos en el inicio.

La resolución en la que trabajé es de 1920x1080 con 125% de zoom.

Abajo les dejo detallado el funcionamiento de cada archivo JavaScript...

--------------------------------------------------------------------------------------------------------------------------

"cargarIndex.js":

Evento de Carga
El código se ejecuta cuando la página web se ha cargado por completo. Esto se logra con el evento DOMContentLoaded. Es una especie de "inicio" para nuestro código.

Cargar Datos
Utiliza una función llamada cargarProductos para obtener datos de productos desde un archivo JSON llamado "productos.json".

Mostrar Productos
Luego, crea elementos en la página (como imágenes, nombres, descripciones y precios) para mostrar estos productos. Los elementos HTML se crean y se agregan al documento.

Manejo de Errores
Si ocurre algún problema al cargar los datos, el código maneja los errores y muestra un mensaje de error.

--------------------------------------------------------------------------------------------------------------------------

"cargarProducto.js":

Obtener el ID del Producto
El código comienza tomando el id del producto desde los parámetros de la URL. Esto permite cargar detalles específicos de un producto basados en su id.

Evento de Carga
Luego, utiliza el evento DOMContentLoaded para esperar a que la página se cargue antes de ejecutar el código principal.

Cargar Datos de Productos
La función cargarProductos se utiliza para obtener datos de productos desde un archivo JSON, nombrado anteriormente. La información se almacena en la variable data.

Mostrar el Producto
Se crea un nuevo elemento HTML para mostrar los detalles del producto correspondiente al id obtenido de la URL. Se muestran elementos como imagen, nombre, descripción y precio.

Agregar al Carrito
Si un usuario hace clic en el botón "Agregar al Carrito", se ejecuta la función agregar. Esta función toma los detalles del producto y los almacena en el almacenamiento local (simulando agregar productos a un carrito de compras).

Manejo de Errores
Si ocurre algún problema al cargar los datos de los productos o al agregar un producto al carrito, el código maneja los errores y muestra mensajes de error.

--------------------------------------------------------------------------------------------------------------------------

"cargarCarrito.js":

Carga de Productos
Cuando se carga la página web, el código escucha el evento DOMContentLoaded. Luego, se llama a la función cargarCarrito. Esta función se encarga de cargar los productos desde el archivo JSON anteriormente nombrado. Los productos se almacenan en el carrito virtual.

Visualización del Carrito
Los productos almacenados en el carrito se muestran en la página web. Cada producto se representa como un elemento de lista, con detalles como su nombre, imagen, precio y cantidad. Si el carrito está vacío, un mensaje de "carrito vacío" se muestra para notificar al usuario.

Interacción con el Carrito
Los usuarios pueden interactuar con los productos en el carrito de las siguientes maneras:

	Incrementar la Cantidad
	Pueden aumentar la cantidad de un producto haciendo clic en el botón "+" junto al producto deseado. Esto aumenta la cantidad y actualiza el precio total del producto.

	Decrementar la Cantidad
	Los usuarios también pueden disminuir la cantidad de un producto haciendo clic en el botón "-" junto al producto. Esto disminuye la cantidad y ajusta el precio total del producto. Si el producto se reduce a una cantidad de 1, no se puede disminuir más.

	Quitar un Producto
	Para eliminar un producto por completo del carrito, los usuarios pueden hacer clic en el botón "Quitar del Carrito" junto al producto. Esto elimina el producto del carrito y ajusta el precio total.

Simulación de Pago
El carrito permite a los usuarios simular un proceso de pago haciendo clic en el botón "Comprar". Hay un 80% de probabilidad de que el pago sea exitoso, lo que significa que el usuario podrá "comprar" los productos. En caso de éxito, se eliminan los productos del carrito y se muestra un mensaje de "pago exitoso". Si ocurre un error en el proceso de pago, se muestra un mensaje de "error en el pago".