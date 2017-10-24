# mystore

> A place were you can manage your stores.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Deploy to firebase

Remember first to build the project. Once built you can deploy.
Current environments: dev, test, prod

If you want to switch to another environment, just provide the alias in the use command.

```
$ firebase use default # sets environment to the default alias
$ firebase use staging # sets environment to the staging alias
```

For a single command, you can also specify the environment using the -P flag:

```
$ firebase deploy -P staging # deploy to staging alias
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Notes
for images? http://cthedot.de/icongen/

for code references https://github.com/academind/yt-devmeetup-vue-firebase

functions folder structure
https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da

## TODO
* General
  * ~~Structure and code clean up~~
  * ~~Loading feature globally~~
  * Fix ui for loading global feature (modal)
* Users
  * Email Verification
  * Create users node
* Stores
  * ~~Popup issue for show/hiding~~
  * ~~Nomre, Description, Imagen,~~ 
  * ~~BUG: Create store imagen no aparce altiro~~
  * ~~BUG: Stores menu lowers~~
  * ~~modal para crear store~~
  * ~~Refactorizar codigo crear store~~
  * ~~store to follow UI as stores! (Sub menu w/icons)~~
  * Currency, tipo Impuesto
  * Quien puede verla (Fuera del Creador)
  * Assign users to stores 
  * F: Different permission leves for users in stores
  * Create "creators" array/user func
* Products: 
  * Default to creation store
  * Nombre, Imagen, Descripción, Categoria, Variaciones, Inventario
  * F: Share products to a diff store
* Prices: Costo, Min, Destribuidor, Detalle
  * Todo sin Iva
* Vendedores
  * Nombre, Descripción, Comisión
* Clientes
  * Nombre, Info contacto, Dirección
  * A quien pertenece
* Ventas
  * Medio de Pago
  * Calculo de Ultilidad, Comisión
  * Transporte, Costo, etc
* Profile
  * Nombre, correo, datos, etc
  * Roles
* Database
  * Seguridad y Rules
* Functions
  * Integridad
* Internacionalizacion
  * Currency
  * Idioma
* Testing!
* Security
  * Review Bucket permissions (who can see what?)
* Offline
  * https://codelabs.developers.google.com/codelabs/offline/#5
  * Evaluate https://github.com/championswimmer/vuex-persist
* DevOps
  * CD & CI, Codeship? travis is expensive

## TODO Future
* Logout console error.
* Confirm password error clearing issue.