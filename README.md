[![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/riseup/c4f7e821aa61df9b1acac1b7bd58719e/raw/rest-api-test__heads_main.json)]

# rest-api-test

[API Demo](https://rest-api-test-01.herokuapp.com)

[OpenAPI - Swagger UI](https://rest-api-test-01.herokuapp.com/api/docs/)

[OpenAPI - Formato JSON](https://rest-api-test-01.herokuapp.com/api/docs.json)

### Entorno
Segun como se encuentre definida la variable `NODE_ENV` se conectará a cada tipo de DB:
- `NODE_ENV=development`: DB sqlite3
- `NODE_ENV=test`: DB sqlite3
- `NODE_ENV=production`: DB postgreSQL

### Instalación de dependencias
```
npm i                     # Instalación de dependencias
cp ejemplo.env .env       # Variables de entorno incluida NODE_ENV
```

### Creación de DB local para desarrollo y testing
Para la creación local de la DB, debe estar asignada la siguiente variable `NODE_ENV=development`
```
npm run db:migrate        # Crea la tabla to_do
npm run db:seed           # Inserta 3 registros en la tabla to_do
```
En el caso de utilizar `NODE_ENV=production`, se debe completar los datos en el `.env` para realizar la conexión a la DB

### Test scripts
Todos usan jest
```

npm t                     # no-verbose, no-coverage, silent
npm run test              # no-verbose, no-coverage, silent
npm run test:s            # silent, verbose, no-coverage
npm run test:v            # verbose, no-silence, no-coverage
npm run test:o            # detectOpenHandles, verbose, no-coverage
npm run test:w            # watch, verbose, no-coverage
npm run test:g            # verbose, only for git uncommitted changes
npm run test:c            # coverage, silent, no-verbose
npm run test:ci           # silent, coverage, update-snapshots
```

### Dev script
```
npm run dev               # nodemon
```

### Start script
```
npm start                 # start
```

### Otros scripts
```
npm db:seed:undo          # Elimina todos los registros de la tabla to_do
npm db:migrate:undo       # Elimina la tabla to_do
```
