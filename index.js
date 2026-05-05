// index.js
// Pre-entrega TechLab - Gestión de productos vía consola

// URL base de la API pública que vamos a usar
const API_URL = "https://fakestoreapi.com/products";

// Capturo los argumentos que se pasan al ejecutar el comando
// Por ejemplo: npm run start GET products → args = ['GET', 'products']
const args = process.argv.slice(2);

// Si no se pasan al menos 2 argumentos, muestro cómo se usa el programa
if (args.length < 2) {
  console.log("Uso: npm run start [MÉTODO] [ruta]");
  console.log("Ejemplos:");
  console.log("  npm run start GET products");
  console.log("  npm run start GET products/5");
  console.log('  npm run start POST products "Camiseta Dino" 299.99 remeras');
  console.log("  npm run start DELETE products/7");
  process.exit(1);
}

// Convierto el método a mayúsculas por si el usuario escribe get, post o delete
const metodo = args[0].toUpperCase();
const ruta = args[1];

if (metodo !== "GET" && metodo !== "POST" && metodo !== "DELETE") {
  console.log("Método no soportado. Usa GET, POST o DELETE.");
  process.exit(1);
}

// Función auxiliar para extraer el id desde rutas como "products/7"
function obtenerIdDesdeRuta(ruta) {
  const partes = ruta.split("/");

  if (partes.length !== 2 || partes[0] !== "products") {
    return null;
  }

  const id = Number(partes[1]);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

// Función principal que maneja la lógica según el comando
async function main() {
  try {
    // Caso 1: Ver todos los productos
    if (metodo === "GET" && ruta === "products") {
      const respuesta = await fetch(API_URL);

      if (!respuesta.ok) {
        console.log("No se pudieron obtener los productos.");
        return;
      }

      const productos = await respuesta.json();
      console.log(productos);
    }

    // Caso 2: Ver un producto por ID
    else if (metodo === "GET" && ruta.startsWith("products/")) {
      const id = obtenerIdDesdeRuta(ruta);

      if (!id) {
        console.log("Ruta inválida. Usa el formato: products/ID");
        return;
      }

      const respuesta = await fetch(`${API_URL}/${id}`);

      if (!respuesta.ok) {
        console.log(`Producto con ID ${id} no encontrado.`);
        return;
      }

      const producto = await respuesta.json();
      console.log(producto);
    }

    // Caso 3: Crear un nuevo producto
    else if (metodo === "POST" && ruta === "products") {
      // Necesito al menos 5 argumentos: POST products "título" precio categoría
      if (args.length < 5) {
        console.log(
          'Faltan datos. Usa: POST products "título" precio categoría',
        );
        return;
      }

      const titulo = args[2];
      const precio = parseFloat(args[3]);
      const categoria = args[4];

      // Valido que el precio sea un número
      if (isNaN(precio) || precio <= 0) {
        console.log("El precio debe ser un número mayor que 0.");
        return;
      }

      // Armo el objeto del nuevo producto
      // Agrego description e image porque la API los usa en sus ejemplos
      const nuevoProducto = {
        title: titulo,
        price: precio,
        category: categoria,
        description: "Producto agregado desde CLI",
        image: "https://i.pravatar.cc",
      };

      // Hago la petición POST
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) {
        console.log("No se pudo crear el producto.");
        return;
      }

      const resultado = await respuesta.json();
      console.log(resultado);
    }

    // Caso 4: Eliminar un producto por ID
    else if (metodo === "DELETE" && ruta.startsWith("products/")) {
      const id = obtenerIdDesdeRuta(ruta);

      if (!id) {
        console.log("Ruta inválida. Usa el formato: products/ID");
        return;
      }

      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        console.log(`No se pudo eliminar el producto con ID ${id}.`);
        return;
      }

      const resultado = await respuesta.json();
      console.log(resultado);
    }

    // Si el comando no coincide con ninguno de los casos anteriores
    else {
      console.log("Comando no reconocido. Revisa la ruta y el método.");
    }
  } catch (error) {
    // Si algo falla, muestro el error
    console.log("Ocurrió un error:", error.message);
  }
}

main();
