# tut-jobopas

a [Sails](http://sailsjs.org) application that combines [TUT Study Guide 2015](http://www.tut.fi/wwwoppaat/opas2015-2016/perus/) and open jobs on [Oikotie Työpaikat](http://tyopaikat.oikotie.fi/).

## Setup dev environment
You will need `yarn`, `node.js` and PostgreSQL database (I use [Postgres.app](http://postgresapp.com/)).

```shell
git clone https://github.com/vaaralav/tut-jobopas.git
cd tut-jobopas
yarn
```
Next `cp config/local.js.example config/local.js` and setup postgresql adapter with your development database settings at the end of `config/local.js`.
```JavaScript
...
connections: {
// Settings for local Postgres.app
postgresql: {
  user: 'YOUR_USERNAME',
  password: '',
  database: 'YOUR_USERNAME',
}
...
```

After that ensure that the database is running and hit `yarn start` (or `sails lift` if you have Sails.js installed globally). Head your browser to `http://localhost:1337` and see the application in action.
