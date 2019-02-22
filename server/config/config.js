/*
    config.js

    This file reads in enviromental variables from
    a .env file found in the root of the directory.

 */
var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    require('dotenv').config();
    process.env.MONGODB_URI = process.env.MONGO_DB_DEV;
}else if(env === 'test'){
    require('dotenv').config();
    process.env.MONGODB_URI = process.env.MONGO_DB_TEST;
}