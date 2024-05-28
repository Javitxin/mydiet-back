# mydiet-back

Vamos a montar el Back de una aplicación de gestión de dietas, en este readme explicaremos lo que realiza esta parte de la aplicación junto con las tecnologías usadas o sus dependencias. A groso modo esta parte el Back se encarga de crear la conexion de la base de datos y toda su gestión, explicaremos los diferentes CRUDS que nuestra aplicación utiliza o lo llamados ENDS POINTS.

## Índice:

- [Dependencias utilizadas en el Back](#dependencias-utilizadas)
- [Estructura de archivos](#estructura-de-archivos)
- [Creación del servidor](#creación-del-servidor)
- [Creación de la base de datos](#creación-de-la-base-de-datos)
- [Creación de los controladores](#creación-de-los-controladores)
- [Creación de los middlewares](#creación-de-los-middlewares)
- [Creación de las rutas](#creación-de-las-rutas)


## Dependencias utilizadas

En este apartado, comentaremos las dependecias que nuestro proyecto necesita para poder funcionar, junto a una breve explicación de su uso:

- `express`: Es un módulo de `Node.js`, que nos proporciona herramientas pequeñas y robustas para servidores HTTP, lo que la convierte en una solución para aplicaciones de una sola página, sitios web, híbridos o API HTTP públicas.
Instalación:
            La forma correcta de instalarla en nuestro proyecto es desde nuestra terminal ejecutar este comando: `"$ npm install express"`.
- `cors`: Módulo de `Node.js`, que permite que el navegador del cliente compruebe con los servidores de terceros si la solicitud está autorizada antes de realizar cualquier transferencia de datos.
Instalación:
            Su instalación desde nuestra termianal es: `"$ npm install cors"`.
- `dotenv`: Es un módulo de dependencia cero que carga variables de entorno desde un `.env` archivo a `process.env`.
En este archivo `.env` es donde tenemos almacenadas todas nuestras variables de entorno.
Instalación:
            La forma correcta de intalarlo desde nuestra termianal es: `"$ npm install dotenv --save"`.
- `firebase-admin`: Es una base da datos NoSQL alojada en la nube que nos permite almacenar y sincronizar datos entre tus usuarios en tiempo real.
Instalación:
            Desde nuestra terminal; `"$ npm install --save firebase-admin"`.
- `@libsql/client`: Es un módulo o librería que se necesita para poder comunicarnos con nuetra base de datos que en este caso está alojada en `Turso`, `Https://turso.tech`.
Instalación:
            Desde nuestra terminal; `"$ npm i @libsql/client"`.
- `sqlite3`: Es un sistema de gestión de bases de datos relacional.
Instalación:
            Desde nuestra terminal; `"$ npm install sqlite3"`.
**Comentario:**
En el caso de `sqlite3`, se instaló porque nuestra base de datos alojada en turso se supone que tira de esa librería.
- `nodemon`: Una utilidad que monitorea los cambios en el código fuente que se está desarrollando y automáticamente reinicia el servidor.
Instalación:
            Desde nuestra terminal; `"$ npm install --save-dev nodemon"`.
**Comentario:**
En archivo `package.json` hemos creado un scripts `"dev": "nodemon index.js"`, que ejecutando esta sentecia desde nuestra terminal; `"$ npm run dev"`, arranca nodemon que a su vez no arranca nuestro servidor.

***Conclusión final***
Una vez bajado el repositorio MYDIET-BACK a nuetro equipo, con ejecutar este comando desde nuestra terminal `"$ npm i"`, se supone que se instalarian todas las dependencias de nuestra apliación.

## Estructura de archivos

```
.
├── config
│   └──config.js
├── src
│   ├── config
│   │   └── firebase-admin.js
│   ├── controllers
│   │   └── dietController.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   └── routes
│       └── dietRoutes.js
├── index.js       
├── .env
└── package.json
 
```
### Características de los archivos

- `config/config.js`: Este archivo contiene la conexión con la base de datos, en este caso está en `Turso`.
- `src/config/firebase-admin.js`: Archivo que contiene la configuración de nuestro firebase y la definició de servicio de autentificación con nuestras variables de entorn que tenemos definidas en nuetro `.env`.
- `src/controllers/dietController.js`: Archivo que contiene la lógica para manejar las solicitudes CRUD de nuestra aplicación y devolverá las respuestas en formato JSON.
- `src/middlewares/authMiddleware.js`: Archivo que contiene el middleware para comprobar si el usuario está autenticado.
- `src/routes/dietRoutes.js`: Archivo que contiene la definición de las rutas CRUD para la aplicación. Este llama a los métodos del controlador.
- `inde.js`: Archivo que contiene la llamada y el arranque de nuestro servidor del Back.
- `.env` : Archivo que contiene todas las variables de entorno de nuestra aplicación.

## Creación del servidor

Vamos a crear el servidor con express.
Como trabajaremos con formularios html, necesitaremos el middleware `express.urlencoded` para leer el body de las peticiones.
El puerto en el que escuchará el servidor lo cargaremos desde el archivo .env usando `dotenv`.
Creamos el archivo `index.js` en la carpeta `src` y añadimos el código necesario para crear el servidor. 

## Creación de la base de datos

Nuestra base de datos relaciona está creada en Turso, en caso de poder desplegar nuestro proyecto, copiariamos la URI y se la pasariamos al front, sino copiaremos la Uri de Turso y la Autentificación en nuestro archivo .env.
Nuestra base de datos está formada por las siguientes tablas:
- usuarios, seguimientocita, plans, plan_detalle_dias, dias, desayunos, comidas, cenas.

## Creación de controladores

En este caso en el archivo `dietController.js`, están alojados todas nuestras solicitudes CRUD de nuetra aplicación.
Devolverá las respuestas en formato HTML, para ello, crearemos algunas funciones auxiliares.

Las funciones principales del controlador son:

- getUserById: Devuelve el nombre apellido correo y contraseña de la tabla `usuarios` por `id`.
- getUserByMail: Nos devuelve todos los campos de la tabla `ususarios` por un `mail` específico.
- createNewUser: Creamos un nuevo usuario en la tabla `usuarios`.
- getAllUsers: Nos devuele todos los usuarios de la tabla `usuarios`.
- updateUser: Con esta función actualizamos los usuarios de la tabla `usuarios`.
- alldietary: Nos devuelve el id y el nombre de la tabla `plans` si el campo `user_id` es igual al el `id` que le pasamos.
- getDietary: Devuelve los campos de la tabla `desayunos`, Titulo, Ingradientes y Preparación mirando en la tabla `dias`  y  mientras el `id` de la tabla `desayuno` sea igual al `id` de la tabla `dias` y mirando en la tabla `plan_detalle_dias` que el `dias_id` de la tabla `plan_detalle_dias` sea igual al `id` de la tabla `dias`, pasandole al `Plan_id` de la tabla `plan_detalle.dias` el `id_plan` de nuestro usuario.
Y lo mismo con la tabla `comidas` y `cenas`.
- newRecipe: En caso de que sea desayuno, comida o cena agregamos en función de la tabla que sea recetas nuevas.
- getRecipes: Mostramos en función de la tabla que sea `desayunos, comidas o cenas` todos sus campos.
- newTracking: Creamos en la tabla `seguimientocita`, una nueva cita.
- getUserTracking: Mostramos todos las citas de la tabla `seguimientocita` mientras el campo `user_id` sea igual al `id` que le pasamos del nuestro usuario.
- updateTracking: Actualizamos los cambios realizados en la tabla `seguimientocita`.
- getAgenda: Nos muestra la Fecha, la hora de la cita, la descripcion de la tabla `seguimientocita` y el nombre y apellido de la tabla `usuarios` siempre y cuando el `id` de la tabla `usuarios` sea igual al campo `user_id` de la tabla `seguimientocita`.
- getDiaries: Nos muestra los campos `dias_id, nombre, fecha dias.desayuno_id dias.comidas_id y dias.cenas_id` de la tabla `dias`.
- updateRecipe: Actualizamos la tabla `dias`.
- newDiary: Creamos un campo en la tabla `dias`.
- deleteDiary: Eliminamos de la tabla `dias` el campo selecionado midiante el `id`.
- deleteRecipe: Eliminamos el campo selecionado de la tabla `desayunos, comidas o cenas`.
- newPlan: Creamos un nuevo plan en la tabla `plans` y agregamos su respectivo campo tabien en la tabla `plan_detalle_dias`.
- getPlanById: Obtenemos los campos `fecha, nombre, descripcion` de la tabla `plans` y los campos `ìd` y `nombre` de la tabla `dias`siempre y cuando le campo `plan_id` de la tabla `plan_detalle_dias` sea igual al `id`de la tabla `plans`, el `id`de la tabla `dias`sea igual al campo `dias_id` de la tabla `plan_detalle_dias` cuando el `id` de la tabla `plans` sea igual al `id_plan` que le pasamos nosotros.
- updatePlan: Actualizamos los campos que se hallan modificado de la tabla `plans`y de la tabla `plan_detalle_dias` en función del campo `dias_id`= al valor que le pasamos.

## Creación de los middlewares

- Para comprobar si las credenciales son correctas, necesitaremos el middleware `express-session` para guardar la sesión del usuario.
También tendremos que añadir una palabra secreta para la sesión en el archivo .env y crear un archivo `middlewares/authMiddleware.js` que contenga el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario.

## Creación de las rutas

- Vamos a crear las rutas CRUD, las rutas serán de tipo GET, PUT, DELETE, POST.
- Get('/'). 
- Get('/user', decodeToken, DietController.getUserByMail).  
- Get('/user/:id/alldietary',decodeToken,  DietController.alldietary).
- Get('/user/:id/alldietary/:id_plan',decodeToken, DietController.getDietary). 
- Get('/user/:id/mytracking', decodeToken, DietController.getUserTracking). 
- Get('/user/:id/myagenda', decodeToken, DietController.getUserTracking ).

- Get('/dashboard/users', decodeToken, DietController.getAllUsers).
- Get('/dashboard/users/:id', decodeToken, DietController.getUserTracking).
- Post('/dashboard/users/newuser', decodeToken, DietController.createNewUser).
- Get('/dashboard/users/:id/getuserbyid', decodeToken, DietController.getUserById).
- Put('/updateuser', decodeToken, DietController.updateUser).

- Get('/dashboard/recipes', decodeToken, DietController.getRecipes).
- Post('/dashboard/recipes/newrecipe', decodeToken, DietController.newRecipe).
- Put('/updatetracking', decodeToken, DietController.updateTracking).
- Put('/updatediary', decodeToken, DietController.updateDiary).
- Post('/dashboard/users/:id/newtracking', decodeToken, DietController.newTracking).

- Get('/dashboard/agenda', decodeToken, DietController.getAgenda).
- Get('/dashboard/diaries', decodeToken, DietController.getDiaries).
- Put('/dashboard/recipes/updaterecipe', decodeToken, DietController.updateRecipe).
- Post('/dashboard/diaries/newdiary', decodeToken, DietController.newDiary).
- Delete('/deletediary',decodeToken,DietController.deleteDiary).
- Delete('/deleterecipe',decodeToken,DietController.deleteRecipe).
- Post('/dashboard/users/:id/newplan', decodeToken, DietController.newPlan).
- Get('/dashboard/users/:id/:id_plan', decodeToken, DietController.getPlanByID).
- Put('/dashboard/users/:id/:id_plan', decodeToken, DietController.updatePlan ).