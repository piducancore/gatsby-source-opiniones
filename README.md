# gatsby-source-opiniones

Este plugin transforma en nodos de Gatsby todas las opiniones recibidas por un tutor del sitio [tusclasesparticulares.cl](https://www.tusclasesparticulares.cl).

## Instalar

```bash
yarn add gatsby-source-opiniones
```

## Configurar

Una vez instalado el plugin, debemos agregarlo en nuestro `gatsby-config.js` y configuramos el nombre de usuario del tutor.

```js
// Ejemplo de gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-opiniones",
      options: {
        username: "nombre-de-usuario-del-tutor",
      },
    },
  ],
}
```

Eso es todo. ✨
