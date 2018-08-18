# Keystone4 Universal React

## Development Setup

**Note**

There is a `.env` file required that represents some configuration information.

* If not already installed, install `git`, `mongodb` and `node`
* run the following commands in a terminal:
  * `git clone` this repo
  * `cd keyston4-universal-react`
  * `git checkout dev`
  * `npm run setup`

### Running the Project

Once project is setup run the following three commands in the root of the project in separate terminals:

* `npm run mongod` to start the database
* `npm run webpack` to start a watcher that will build the javascript
* `npm start` to start the server (which will auto-restart on file change)

I recommend using [iTerm2](https://www.iterm2.com/) on mac, or [cmmdr](http://cmder.net/) in windows so you can have multiple terminal panes visible at once.

## Build

To build the project run `npm run build` at the root of the project.

This will:
* delete and recreate the `./build-new` folder
* build the client code and copies `./public` folder into `./build-new` folder (deletes `scss` folder from within `./build-new/public` folder)
* builds the `./both` folder to `./build-new/both`
* builds the `./server` folder to `./build-new/server`
* copies the current environment file (`.env`) to `./build-new/.env`.
* removes current `./build` folder and then renames `./build-new` to `./build`

## Hosting on Amazon AWS

### Creating an AWS instance on EC2

* Create an EC2 instance with Ubuntu
* [Install mongo](https://docs.mongodb.com/v3.4/tutorial/install-mongodb-on-ubuntu/)
  * You can check Ubuntu version with `lsb_release -a`
* `sudo apt-get install build-essential g++`
* [Install Node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* `sudo npm install -g pm2`
* `cd ~` (to make sure you're in the home directory)
* `git clone` this repository
* `cd keystone4-universal-react`
* If on staged: `git checkout staged`
* `npm run setup-prod` (or `npm run setup-staged`)
* `sudo npm run build`
* `cd build`
* `sudo pm2 start server/index.js`
  * optionally run `sudo pm2 logs 0` to see if everything is alright with the server

#### `PM2` notes

`PM2` is used to run the site, and to restart it if there is an error.

In `build` directory (created by build step):
* `sudo pm2 kill && sudo pm2 start server/index.js` (**`sudo` is necessary to run on port 80**)

To stop running:
* `sudo pm2 kill` to stop all server instances

To restart:
* `sudo pm2 restart 0`

To stop running:
* Use `pm2 stop 0` to stop the correct process
* Use `pm2 delete 0` to delete the correct process from pm2 process list

#### Database Logs

The mongo database data is stored in `/var/lib/mongo/`

The mongo logs are stored in `/var/logs/mongodb`

### Connecting to AWS EC2 over `ssh`

In order to connect over ssh, make sure that security group settings for your EC2 instance will allow your inbound connection over ssh.

To add an ip you must do the following:

* Log into the EC2 console on AWS for the instance you want to change
* Go to the Security Groups panel
* Edit the inbound rules (type = ssh, and follow the examples of others)

After that, go to the base directory of the site after cloning it and run the following command:

`ssh -i "<pem-file-name>.pem" <url/ip>`
(If you get an error try chmod 400 <pem-file-name>.pem)

* staged
  * `ssh -i "<pemfile>" ubuntu@1.1.1.1`
* prod
  * `ssh -i "<pemfile>" ubuntu@1.1.1.1`

### Deploying

* `ssh` into server
* `cd ./keystone4-universal-react`
* `sudo npm run deploy`

## Project Conventions

### JavaScript

* Use ES6+ where possible.
* Keep things close to data

### Files and Folders

There are a number of different kinds of components broken into different folders for organization purposes.

* blocks - these components have children that are passed in, and generally provide some display effect reused throughout the site.
* components - these are components that take props and render - they don't have reducers
* containers - these components are like normal components but smart, i.e., they may have reducers, or maintain the state of a ground of other components
* inputs - smart components used for forms
* global - these are like containers, but particularly are components that load everywhere on the site
* pages - these are like containers, but are distinguished semantically because they represent pages (they are routed to)
* svg - these are svgs. Props are passed in to control their display characteristics.

If there are any components that are only used within one specific component, you can create the folder for the components inside of the other component folder (e.g., /both/global/Header contains a Navigation folder). If there are a few components that are only used within a single component, then create directories for `component`, `container`, &c.

If pages are getting long, and can be broken into logical parts to keep them easier to think about, you can create a `partials` folder within the directory of that page (i.e., `/both/pages/HomePage/partials/SomePartial/index.js`).

#### React

This project uses the following `react` and react-oriented libraries:
* `react-dom`
* `react-router`
* `redux`
* `react-redux`
* `redux-connect`

There are several kinds of react components:

* global - components loaded at all times
  * *e.g.,* header, footer
* pages  - represent a page
* container - wrap components and provide them with data
* blocks - structural elements. Used to wrap elements in order to fit them on a page in a regular way
  * *e.g.,* floating content, spacer content
* component - simple elements that render information and fire events (passed in by containers or parents)
* inputs - inputs for use in forms. These are all fairly smart components.

global, page and container components can have the following files for persisting state:

* `index.js` - a thin wrapper that code splits the page component being loaded
* `component.js` - the component itself
* If a reducer is required for the page:
  * `actions.js` - action creator functions
  * `constants.js` - constants that represent action names
  * `reducer.js` - the reducer for this component

### CSS (SASS)

This project uses [atomic-scss](https://github.com/internetErik/atomic-scss) as much as possible. For everything that can't be done reasonably with atomic scss (which isn't a lot) we losely follow [BEM](http://getbem.com/introduction/). Tend towards giving components BEM style class names, even if you don't actually use them in any scss file.

* Try to do as much styling as you can with atomic styles
* If you can't, then create a scss file
  * The folder structure of the scss files should match the directory structure for react components
    * `both/global` => `public/scss/global`
    * `both/pages` => `public/scss/pages`
    * `both/containers` => `public/scss/containers`
    * `both/component` => `public/scss/component`
    * `both/blocks` => `public/scss/blocks`
    * `both/inputs` => `public/scss/inputs`
    * `both/svg` => `public/scss/svg`
  * The CSS class for a component should be the component name converted from camel case to hyphen case
    *`HomePage` => `home-page`
  * The scss file should be named the same as the CSS class used for the components (e.g., `home-page`)

### Server Side Rendering (SSR)

This project renders the front-end on the server on the first request in a manner that allows `react` to take over on the front-end.

Some components need to load data from mongo (via `keystonejs`'s mongoose interface). In order to do this, there is a folder called `server/data` that contains a file `index.js` as well as other files.

#### Regarding `server/data/index.js`

This file exports a function (`populateData`) that takes a url and uses it to determine what data gathering functions must be called. These data gathering functions live in the other files that are in the `server/data` folder.

#### Methods For Getting Data

All functions used by `populateData` to lookup data must return a `Promise`. They must also take an object as a first argument. Any data fetched from mongo will be assigned to this object before the `Promise` resolves.

#### Getting More Data (On the `populateData` Function)

If you need to get more data out of mongo you'll need to add code to `populateData`.

## ToDos

### Webpack Enhancements

* Read sass variable files in with [sass-variable-loader](https://www.npmjs.com/package/sass-variable-loader). This would help us to have one place where we kept breakpoint values.
