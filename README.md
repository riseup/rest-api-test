
# rest-api-test

[API Demo](https://rest-api-test-01.herokuapp.com)

[OpenAPI - Swagger UI](https://rest-api-test-01.herokuapp.com/api/docs/)

[OpenAPI - Formato JSON](https://rest-api-test-01.herokuapp.com/api/docs.json)

### Entorno
Segun como se encuentre definida la variable `NODE_ENV` se conectará a cada tipo de DB:
- `NODE_ENV=development`: DB sqlite3
- `NODE_ENV=test`: DB sqlite3
- `NODE_ENV=production`: DB postgreSQL

#### Instalación de dependencias
```
npm i                     # Instalación de dependencias
cp ejemplo.env .env       # Variables de entorno incluida NODE_ENV
```

#### Creación de DB local para desarrollo y testing
Para la creación local de la DB, debe estar asignada la siguiente variable `NODE_ENV=development`
```
npm run db:migrate        # Crea la tabla to_do
npm run db:seed           # Inserta 3 registros en la DB
```
En el caso de utilizar `NODE_ENV=production`, se debe completar los datos en el `.env` para realizar la conexión a la DB

#### Test scripts
Todos usan jest
```
npm run test              # Solo jest
npm run test:w            # watch
npm run test:o            # detectOpenHandles
npm run test:v            # verbose
npm run test:s            # silent
```

#### Dev script
```
npm run dev               # nodemon
```

#### Start script
```
npm start                 # start
```

#### Otros scripts
```
npm db:seed:undo          # Elimina todos los registros de la tabla to_do
npm db:migrate:undo       # Elimina la tabla to_do
```
