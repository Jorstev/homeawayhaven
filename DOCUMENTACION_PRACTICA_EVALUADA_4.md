# Universidad Fidelitas

## SC-609 Base de datos No SQL

### Practica Evaluada No. 4

**Integrante:** Jordan Steven Chavarria Davila  
**Profesor:** Marvin Solano Campos  
**Fecha:** Lunes 20 de Julio, 2026

---

## 1. Introduccion

La presente practica evaluada consiste en el diseno, configuracion e integracion de una base de datos NoSQL en MongoDB Atlas para una aplicacion web de alojamientos llamada HomeAwayHaven. El sistema permite visualizar hospedajes, consultar sus detalles, administrar informacion desde una consola interna y mantener datos relacionados con amenidades, ubicaciones, reservas y usuarios administrativos.

El problema principal abordado en el proyecto fue la migracion y adaptacion del consumo de datos hacia MongoDB, preservando el funcionamiento del frontend y agregando una capa de API basada en Express para conectar la aplicacion React con MongoDB Atlas. A partir de esta integracion, fue posible estructurar la informacion en colecciones, aplicar validaciones, definir indices y ejecutar operaciones CRUD sobre los documentos almacenados.

Adicionalmente, el desarrollo permitio trabajar conceptos clave de bases de datos NoSQL como modelado documental, referencias entre colecciones, validadores JSON Schema, indices simples y compuestos, y manejo de datos semiestructurados orientados a una aplicacion real.

---

## 2. Objetivos

### 2.1 Objetivo general

Implementar y documentar una solucion basada en MongoDB Atlas para la gestion de alojamientos de la aplicacion HomeAwayHaven, integrando el modelo documental con una aplicacion web moderna y aplicando operaciones CRUD, consultas e indices sobre la base de datos.

### 2.2 Objetivos especificos

1. Disenar una estructura de base de datos NoSQL adecuada para administrar alojamientos, ubicaciones, amenidades, reservas y usuarios administrativos.
2. Integrar MongoDB Atlas con una API construida en Express y un frontend desarrollado con React.
3. Implementar operaciones CRUD sobre la coleccion principal de alojamientos.
4. Definir indices que optimicen consultas frecuentes del sistema.
5. Documentar la configuracion, estructura, consultas y resultados obtenidos durante el desarrollo.

---

## 3. Descripcion del sistema

HomeAwayHaven es una aplicacion web para explorar y administrar alojamientos turisticos. El sistema ofrece una vista publica y una vista administrativa.

En la vista publica, el usuario puede:

1. Visualizar una lista de alojamientos.
2. Filtrar alojamientos por categoria, por ejemplo hotel, cabin o house.
3. Consultar el detalle de cada hospedaje.
4. Visualizar amenidades asociadas a cada propiedad.
5. Observar la ubicacion en mapa y la bandera del pais correspondiente.
6. Guardar hospedajes en bookmarks mediante `localStorage`.
7. Simular un flujo de reserva y confirmacion de pago.

En la vista administrativa, el usuario puede:

1. Ingresar a una consola administrativa.
2. Crear nuevos alojamientos.
3. Editar alojamientos existentes.
4. Eliminar registros.
5. Modificar amenidades asociadas a un alojamiento.

La aplicacion utiliza una API REST intermedia desarrollada con Express, la cual se conecta a MongoDB Atlas mediante el driver oficial de MongoDB para Node.js. Esta API traduce la informacion almacenada en la base de datos hacia el formato consumido por el frontend.

---

## 4. Modelo de la base de datos

El sistema trabaja actualmente con un modelo documental distribuido en varias colecciones. La coleccion principal es `bookings`, la cual se relaciona con otras colecciones como `locations`, `amenities`, `reservations` y `admins`.

### 4.1 Coleccion `bookings`

Almacena la informacion principal de cada alojamiento.

**Campos principales:**

1. `_id`
2. `legacyBookingId`
3. `title`
4. `country`
5. `location`
6. `description`
7. `classification`
8. `luxury`
9. `maxCapacity`
10. `numBeds`
11. `checkoutTime`
12. `pricing`
13. `image`
14. `amenities`
15. `status`
16. `createdAt`
17. `updatedAt`

**Ejemplo de documento:**

```json
{
  "_id": { "$oid": "668900000000000000000001" },
  "legacyBookingId": "1721234567890",
  "title": "Fullmoon Lodge",
  "country": "Costa Rica",
  "location": { "$oid": "6a5ea41ba82237d2194bb8e3" },
  "description": "Cabin surrounded by rainforest with private terrace, quiet atmosphere, and direct access to nearby trails.",
  "classification": "cabin",
  "luxury": false,
  "maxCapacity": 2,
  "numBeds": 1,
  "checkoutTime": "11:00",
  "pricing": {
    "basePrice": 180,
    "discountPercent": 10,
    "finalPrice": 162,
    "currency": "USD"
  },
  "image": {
    "filename": "fullmoon-lodge.png",
    "mimeType": "image/png",
    "sizeBytes": 68,
    "alt": "Front view of Fullmoon Lodge"
  },
  "amenities": [
    { "$oid": "6a5e8a73a82237d2194bb8c8" },
    { "$oid": "6a5e8a73a82237d2194bb8c9" }
  ],
  "status": "active"
}
```

### 4.2 Coleccion `locations`

Almacena la informacion geografica de las propiedades y permite separar la ubicacion del documento principal del alojamiento.

**Campos principales:**

1. `_id`
2. `countryCode`
3. `country`
4. `city`
5. `coordinates`

**Ejemplo de documento:**

```json
{
  "_id": { "$oid": "6a5ea41ba82237d2194bb8e3" },
  "countryCode": "CR",
  "country": "Costa Rica",
  "city": "San Jose",
  "coordinates": {
    "type": "Point",
    "coordinates": [-84.0907, 9.9281]
  }
}
```

### 4.3 Coleccion `amenities`

Almacena el catalogo de amenidades disponibles y permite referenciarlas desde los alojamientos.

**Campos principales:**

1. `_id`
2. `code`
3. `label`

**Ejemplo de documento:**

```json
{
  "_id": { "$oid": "6a5e8a73a82237d2194bb8c8" },
  "code": "BEACH",
  "label": "Beach Access"
}
```

### 4.4 Coleccion `reservations`

Almacena la informacion de las reservas realizadas o sembradas en la base de datos.

**Campos principales:**

1. `_id`
2. `bookingId`
3. `bookingSnapshot`
4. `guest`
5. `stay`
6. `pricing`
7. `payment`
8. `status`
9. `createdAt`
10. `updatedAt`

**Ejemplo de documento:**

```json
{
  "_id": { "$oid": "668900000000000000000101" },
  "bookingId": { "$oid": "668900000000000000000001" },
  "guest": {
    "firstName": "Jordan",
    "lastName": "Chavarria",
    "email": "jordan@example.com"
  },
  "stay": {
    "checkIn": { "$date": "2026-08-10T00:00:00.000Z" },
    "checkOut": { "$date": "2026-08-14T00:00:00.000Z" },
    "guests": 2
  },
  "status": "confirmed"
}
```

### 4.5 Coleccion `admins`

Almacena el usuario administrativo sembrado para fines de gestion del sistema.

**Campos principales:**

1. `_id`
2. `username`
3. `email`
4. `passwordHash`
5. `role`
6. `isActive`
7. `createdAt`
8. `updatedAt`
9. `lastLoginAt`

**Ejemplo de documento:**

```json
{
  "_id": { "$oid": "668900000000000000000201" },
  "username": "admin_homeawayhaven",
  "email": "admin@homeawayhaven.com",
  "role": "admin",
  "isActive": true
}
```

### 4.6 Relaciones entre colecciones

Las relaciones del modelo se pueden resumir de la siguiente manera:

1. Un documento de `bookings` referencia una ubicacion en `locations`.
2. Un documento de `bookings` referencia varias amenidades en `amenities`.
3. Un documento de `reservations` referencia un alojamiento en `bookings` mediante `bookingId`.
4. La coleccion `admins` representa los usuarios administrativos del sistema.

**Esquema conceptual simplificado:**

```text
bookings ----> locations
bookings ----> amenities
reservations ----> bookings
admins ----> consola administrativa
```

[Insertar captura del modelo o diagrama aqui]

---

## 5. Tecnologias utilizadas

### 5.1 Lenguaje de programacion

El lenguaje principal utilizado fue JavaScript.

### 5.2 Frameworks y herramientas principales

1. React 18.3.1
2. Vite 5.4.1
3. Express 4.21.2
4. MongoDB Node.js Driver 6.8.0

### 5.3 Base de datos

1. MongoDB Atlas
2. Driver utilizado en el proyecto: `mongodb` version 6.8.0
3. Version exacta del cluster Atlas: **completar manualmente desde el panel de Atlas**

### 5.4 IDE

Visual Studio Code

### 5.5 Librerias utilizadas

1. `@reduxjs/toolkit`
2. `react-redux`
3. `@tanstack/react-query`
4. `react-hook-form`
5. `react-router-dom`
6. `react-hot-toast`
7. `leaflet`
8. `primereact`
9. `primeicons`
10. `tailwindcss`
11. `multer`
12. `cors`
13. `react-spinners`

---

## 6. Configuracion de la conexion

La conexion utilizada en el proyecto corresponde a MongoDB Atlas. La aplicacion no se conecta directamente desde el frontend, sino a traves de una API Express que actua como capa intermedia.

### 6.1 Tipo de conexion

Conexion remota a MongoDB Atlas.

### 6.2 Variables utilizadas

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=homeawayhaven
PORT=3001
```

### 6.3 Cadena de conexion

La cadena de conexion sigue la estructura:

```text
mongodb+srv://<usuario>:<contrasena>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

No se incluyen contrasenas reales por razones de seguridad.

### 6.4 Configuracion realizada

1. Se configuro una instancia `MongoClient` en el archivo `server/index.js`.
2. Se definio la base de datos por medio de la variable `MONGODB_DB`.
3. Se levantaron validadores e indices usando `mongosh` y scripts de inicializacion.
4. Se utilizo una API REST en Express para ejecutar las operaciones sobre MongoDB.

### 6.5 Scripts de inicializacion

```bash
npm run db:init:atlas
npm run db:seed:atlas
```

[Insertar captura de la configuracion de Atlas o colecciones aqui]

---

## 7. Usuarios creados

En el proyecto se identifican dos niveles de usuario:

### 7.1 Usuario administrativo almacenado en MongoDB

**Coleccion:** `admins`

**Usuario sembrado:**

1. `username`: `admin_homeawayhaven`
2. `email`: `admin@homeawayhaven.com`
3. `role`: `admin`
4. `isActive`: `true`

### 7.2 Rol y permisos

El rol documentado en la coleccion es `admin`, y su proposito dentro del sistema es permitir tareas administrativas como:

1. Agregar alojamientos.
2. Editar alojamientos.
3. Eliminar alojamientos.
4. Modificar amenidades asociadas.

### 7.3 Consideracion importante

Aunque el usuario existe en la base de datos, el login actual del frontend es un acceso simulado para fines academicos. Es decir, la interfaz administrativa usa un estado local en Redux y no valida credenciales reales contra MongoDB.

[Insertar captura de la coleccion admins aqui]

---

## 8. Indices

En el proyecto se implementaron indices para optimizar consultas frecuentes. Los indices fueron definidos en el script `scripts/mongodb/init-homeawayhaven.mongodb.js`.

### 8.1 Indice simple

**Coleccion:** `bookings`  
**Campo:** `legacyBookingId`

**Comando:**

```javascript
db.bookings.createIndex(
  { legacyBookingId: 1 },
  {
    name: "uq_bookings_legacyBookingId",
    unique: true,
    partialFilterExpression: { legacyBookingId: { $exists: true } },
  },
);
```

**Consulta optimizada:**

```javascript
db.bookings.find({ legacyBookingId: "1721234567890" });
```

**Explicacion:**

Este indice mejora las busquedas exactas de un alojamiento a partir del identificador logico que utiliza el frontend. Es un buen ejemplo de indice simple porque trabaja sobre un solo campo y acelera operaciones puntuales de lectura, edicion y eliminacion.

### 8.2 Indice compuesto

**Coleccion:** `bookings`  
**Campos:** `status`, `luxury`, `classification`, `pricing.discountPercent`

**Comando:**

```javascript
db.bookings.createIndex(
  {
    status: 1,
    luxury: 1,
    classification: 1,
    "pricing.discountPercent": 1,
  },
  { name: "idx_bookings_listing_filters" },
);
```

**Consulta optimizada:**

```javascript
db.bookings.find({
  status: "active",
  luxury: false,
  classification: "hotel",
});
```

**Explicacion:**

Este indice compuesto favorece consultas donde se aplican varios criterios de filtrado sobre los alojamientos. Resulta util para escenarios donde se desea separar alojamientos activos, de lujo o por clasificacion, y tambien considerar descuentos al momento de filtrar o segmentar resultados.

### 8.3 Otros indices implementados

1. Indice geoespacial `2dsphere` sobre `location.coordinates`.
2. Indice compuesto en `reservations` sobre `bookingId`, `stay.checkIn` y `stay.checkOut`.
3. Indice simple sobre `guest.email` en `reservations`.
4. Indice compuesto sobre `status` y `payment.status` en `reservations`.
5. Indices unicos sobre `username` y `email` en `admins`.

[Insertar captura de la pestaña Indexes en Atlas aqui]

---

## 9. Operaciones CRUD

Las operaciones CRUD principales del sistema fueron implementadas sobre la coleccion `bookings`.

### 9.1 Create

Permite agregar un nuevo alojamiento desde la consola administrativa.

**Ruta:** `POST /api/bookings`

**Descripcion:**

1. Recibe los datos del formulario administrativo.
2. Procesa la imagen mediante `multer`.
3. Construye el documento y lo inserta en MongoDB.

[Insertar captura de la operacion Create aqui]

### 9.2 Read

Permite consultar los alojamientos y sus detalles.

**Rutas principales:**

1. `GET /api/bookings`
2. `GET /api/bookings/:bookingId/amenities`
3. `GET /api/amenities`

**Descripcion:**

1. Se listan todos los alojamientos activos.
2. Se resuelven referencias a ubicaciones y amenidades.
3. El frontend consume estos datos para listados, detalle y edicion.

[Insertar captura de la operacion Read aqui]

### 9.3 Update

Permite editar un alojamiento existente.

**Ruta:** `PATCH /api/bookings/:bookingId`

**Descripcion:**

1. Se localiza el alojamiento por `legacyBookingId` o `_id`.
2. Se actualizan los campos enviados desde el formulario.
3. Se pueden modificar amenidades seleccionadas.

[Insertar captura de la operacion Update aqui]

### 9.4 Delete

Permite eliminar un alojamiento desde la consola administrativa.

**Ruta:** `DELETE /api/bookings/:bookingId`

**Descripcion:**

1. El usuario selecciona la opcion eliminar.
2. La API localiza el documento correspondiente.
3. El registro se elimina de la coleccion `bookings`.

[Insertar captura de la operacion Delete aqui]

---

## 10. Consultas

A continuacion se presentan algunas consultas implementadas o utilizadas indirectamente por la API.

### 10.1 Consulta de todos los alojamientos

```javascript
db.bookings.find({ status: { $ne: "archived" } }).sort({ createdAt: -1 });
```

**Resultado esperado:** listado de alojamientos visibles para la aplicacion.

[Insertar captura del resultado aqui]

### 10.2 Consulta de un alojamiento especifico por identificador

```javascript
db.bookings.findOne({ legacyBookingId: "1721234567890" });
```

**Resultado esperado:** un documento de la coleccion `bookings`.

[Insertar captura del resultado aqui]

### 10.3 Consulta de amenidades asociadas a un alojamiento

```javascript
db.bookings.findOne({ legacyBookingId: "1721234567890" });
```

Posteriormente la API resuelve los ObjectId de `amenities` en la coleccion correspondiente.

**Resultado esperado:** amenidades como `Beach Access`, `Hot Tub`, `24/7 Security` o `Private Balcony`.

[Insertar captura del resultado aqui]

### 10.4 Consulta del catalogo de amenidades

```javascript
db.amenities.find({});
```

**Resultado esperado:** lista completa de amenidades disponibles para el formulario administrativo.

[Insertar captura del resultado aqui]

### 10.5 Consulta de ubicacion de un alojamiento

```javascript
db.locations.findOne({ _id: ObjectId("6a5ea41ba82237d2194bb8e3") });
```

**Resultado esperado:** documento con `countryCode`, `country`, `city` y `coordinates` para renderizar bandera y mapa.

[Insertar captura del resultado aqui]

---

## 11. Conclusiones

1. MongoDB Atlas permitio estructurar la informacion del sistema de forma flexible, especialmente para el manejo de alojamientos y sus datos relacionados.
2. El uso de una API intermedia con Express facilito desacoplar el frontend de la base de datos y controlar mejor el formato de respuesta consumido por React.
3. Los validadores JSON Schema ayudan a mantener consistencia documental aun en un entorno NoSQL, evitando errores de estructura en colecciones criticas.
4. Los indices simples y compuestos mejoran el rendimiento de consultas frecuentes, especialmente en busquedas por identificador y filtrado de alojamientos.
5. El modelo documental de MongoDB resulta apropiado para aplicaciones donde conviven informacion principal, relaciones ligeras y datos semiestructurados como imagenes, precios y amenidades.
6. La separacion en colecciones como `locations` y `amenities` permite reutilizar informacion y simplificar futuras ampliaciones del sistema.
7. La migracion desde una fuente anterior de datos hacia MongoDB Atlas evidencia la importancia de adaptar tanto el modelo como la capa de acceso para mantener la compatibilidad con la aplicacion.

---

## 12. Observaciones finales para la entrega

1. Convertir este archivo a Word o PDF respetando la estructura de secciones.
2. Sustituir los espacios de captura por imagenes reales del sistema y de MongoDB Atlas.
3. Completar manualmente la version exacta del cluster de MongoDB Atlas desde el panel de administracion.
4. Si el profesor solicita evidencias visuales adicionales, agregar capturas del panel de colecciones, indices, documentos y resultados de consultas.
