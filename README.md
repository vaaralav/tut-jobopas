# tut-jobopas

a [Sails](http://sailsjs.org) application that combines [TUT Study Guide 2015](http://www.tut.fi/wwwoppaat/opas2015-2016/perus/) and open jobs on [Oikotie Työpaikat](http://tyopaikat.oikotie.fi/).

## Setup dev environment
You will need `npm`, `node.js` and PostgreSQL database (I use [Postgres.app](http://postgresapp.com/)).

```
git clone https://github.com/vaaralav/tut-jobopas.git
cd tut-jobopas
npm install
```
Next `cp config/local.js.example config/local.js` and setup postgresql adapter with your development database settings in `config/local.js`.

After that ensure that the database is running and hit `npm start` (or `sails lift` if you have Sails.js installed globally). Head your browser to `localhost:1337` and see the application in action.
