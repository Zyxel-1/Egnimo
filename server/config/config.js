var env = process.env.NODE_ENV || 'development';


// Local dev/test enviroments variables
if (env === 'development'||env === 'test'){
    console.log(`\n\tLocal Enviroment ========> [${env}]\n`)
    if(env==='development'){
        process.env.PORT=3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/greymessenging_Dev'
    }else{
        process.env.PORT=3000;
        process.env.MONGODB_URI='mongodb://localhost:27017/greymessenging_Test'
    }
}