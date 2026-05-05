# Pre-Entrega Node.js - TechLab.

Este proyecto corresponde a la pre-entrega del curso de Node.js en TechLab.

El objetivo es desarrollar una herramienta de consola que permita gestionar productos de una tienda online consumiendo la API pública Fake Store.

## Descripción

La aplicación interpreta comandos ingresados desde la terminal mediante `process.argv` y ejecuta operaciones sobre productos.

Actualmente contempla los siguientes casos:

- Consultar todos los productos.
- Consultar un producto específico por ID.
- Crear un nuevo producto.
- Eliminar un producto por ID.

## Tecnologías utilizadas

- Node.js
- JavaScript
- Fetch API
- Fake Store API

## Requisitos

- Tener instalado Node.js versión 18 o superior.
- Tener conexión a internet para consumir la API.

## Estructura del proyecto

```bash
techlab/
├── index.js
├── package.json
└── README.md
```

- `index.js`: contiene la lógica principal del programa.
- `package.json`: define la configuración del proyecto y el script `start`.
- `README.md`: documentación básica de uso.

## Instalación

1. Clonar o descargar el proyecto.
2. Abrir una terminal en la carpeta raíz.
3. Instalar dependencias si fuera necesario con:

```bash
npm install
```

## Uso

Abrí la terminal en la carpeta del proyecto y ejecutá alguno de los siguientes comandos.

### Ver todos los productos

```bash
npm run start GET products
```

### Ver un producto por ID

```bash
npm run start GET products/5
```

### Crear un producto

```bash
npm run start POST products "Nombre del producto" 299.99 categoria
```

### Eliminar un producto

```bash
npm run start DELETE products/7
```

## Ejemplos válidos

```bash
npm run start GET products
npm run start GET products/15
npm run start POST products "Camiseta Dino" 299.99 remeras
npm run start DELETE products/7
```

## Notas

- El programa valida el método ingresado y la estructura básica de la ruta.
- Para crear un producto, también se envían los campos `description` e `image`, ya que forman parte de la estructura del producto en Fake Store API.
- La aplicación muestra mensajes de error simples en caso de rutas inválidas o fallas en la petición.

## Autor

Desarrollado como pre-entrega del curso de Back-End con Node.js en TechLab.
