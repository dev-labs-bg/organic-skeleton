# A boilerplate for building NodeJS web applications.

## Implemented via the ['Organic'](https://github.com/VarnaLab/node-organic) pattern.

### Prerequisites
* NodeJS v6.2.1 or above
* Mongodb v3.2.6 or above

### Running tests
* ``npm test`` runs all tests
* ``node_modules/.bin/jasmine`` runs all tests
* ``node_modules./bin/jasmine <filename>`` runs individual test batch

### Running tasks
* ``./node_modules/.bin/grunt <task name>``

### Setup and start
1. ``npm install``
2. Follow instructions in /dna/README.md to setup your custom project configuration [Optional]
3. ``npm run seed`` to fill up db with demo data.
4. ``node index.js`` or ``npm start``
