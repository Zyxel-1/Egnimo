var env = process.env.NODE_ENV || 'development';

if (env === 'development'||env === 'test'){
    console.log(`\n\tLocal Enviroment ========> [${env}]\n\n`)

    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    })
}
/**
// Local dev/test enviroments variables
if (env === 'development'||env === 'test'){
    console.log(`\n\tLocal Enviroment ========> [${env}]\n\n`)
    if(env==='development'){
        process.env.PORT=3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/greymessenging_Dev'
    }else{
        process.env.PORT=3000;
        process.env.MONGODB_URI='mongodb://localhost:27017/greymessenging_Test'
    }
}
 */