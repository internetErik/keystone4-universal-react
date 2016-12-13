# Keystone 4 (beta) With Universal React

**This project is a work in progres, and the goal of it is to learn how these technologies are setup**

## Goal

Server-side rendering with react (and redux) including detail pages (e.g., blog posts).

## Setup

* `clone`
* `npm install`
* `mkdir mongo_data`
* `mkdir mongo_data/db`

To run project you must run

* `npm run mongod` to start a mongo instance
* `npm run webpack` to start webpack
* `npm run dev-start`  to start server (with `babel-node`)

## Building for Production

`npm run build`

## Run production build

`npm start`

## Front-End Libraries/Frameworks In Use

* react
* react-dom
* redux
* react-redux
* redux-connect
* react-router
* reselect

## Setup on AWS Instance

* Create an instance of Amazon Linux on AWS
* connect to instance with `ssh -i "<pem-file-name>.pem" ec2-user@ec2-35-164-36-7.us-west-2.compute.amazonaws.com`
* [installing node on Amazon Linux (stackoverflow)](http://stackoverflow.com/questions/27350634/how-to-yum-install-node-js-on-amazon-linux/35165401#35165401)
* [installing MongoDB on Amazon Linux](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-amazon/#install-mongodb-community-edition)
  * run mongo with `sudo service mongod start`
