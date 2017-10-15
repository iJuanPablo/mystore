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

##Deploy to firebase

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
