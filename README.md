# A boilerplate for building NodeJS web applications.

## Implemented via the [Organic](https://github.com/VarnaLab/node-organic) pattern.

### Prerequisites
* NodeJS v6.2.1 or above
* Mongodb v3.2.6 or above

### Running tests
* ``npm test`` runs all tests
* ``node_modules/.bin/jasmine`` runs all tests
* ``node_modules./bin/jasmine <filename>`` runs individual test batch

### Setup and start
1. ``npm install``
2. Configure mongodb
  - Replace "organic-skeleton-db/organic-skeleton-test-db" with your db name for _development, _production and _test environments in `dna/processes/index.json` files

  Note: Keep in mind it's a good idea to use different db for tests, since it will be wiped out every time you run them.
3. ``npm run seed`` to fill up db with demo data.
4. ``node index.js`` or ``npm start``


### Project structure

- `root`
  - `assets` - Contains your server side-resources, documents, json files, etc.
  - `cell` - This is the root of your main cell
    - `models` - Contains the mongoose models
    - `organelles` - Contains your cell organelles (This is where the magic happens)
  - `dna` - This is where your project configuration lays.
  - `public` - Contains files accessible by default on the server. Express is setup to feed this folder as a statis folder on the `static/` route
  - `spec` - The Jasmine tests live in this directory
    - `helpers` - Helper scripts that are loaded by Jasmine by default (`bootstrap.js` file)
    - `support` - Jasmine configuration files
  - `tasks` - Tasks are standalone scripts that you can use to execute code from the command line. You can wrap them up in a Grunt setup, use NPM scripts, call them manually or whatever suits you.
