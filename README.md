# ![GreyMessagingLogo](https://raw.githubusercontent.com/Zyxel-1/GreyMessaging/docs/documents/images/greyMessagingLogo.png)

An end to end encrypted chat application between two individuals.

## Get Started

### Pre-requisite/Setup

In order to get the project running you need the following:

* **MongoDB**
  * Install and setup v4.0.6
* **Node.js**
  * Developed using v11.2.0
* **Environmental Variables**
  * Create an '.env' file in the root directory from the '.env.default' template.
  * You'll need to fill in the server port, MongoDb URI, and a secret key for JWT creation.
  * There are two MongoDB URI variables used to create two different databases depending on whether your developing or testing.
  * Variables will be loaded when the server start

### Development

* Installing Dependencies

  * ```bash
    npm install
    ```

* Running the project

  * ```bash
    nodemon server/app.js
    ```

  * The backend project would start, connect to the database, and wait on the port specified on the .env file.

* Basic Structure

  * ```text
    /GreyMessaging
    	/NodeModules
    	/server
    		/config
    			config.js
    		/database
    			mongoose.js
    		/middleware
    			passport.js
    		/models
    			user.js
    			/seedData
    				userSeed.js
    		/routes
    			/main
    				main.js
    				main.test.js
    			/user
    				user.js
    				user.test.js
    			index.js
    		/validations
    			constraints.js
    		app.js
    	package.json
    	README.md
    	.env
    	.env.default
    ```

    A little explanation on the file structure.

    | Folder       | Purpose                                                      |
    | ------------ | ------------------------------------------------------------ |
    | /config      | Contains config.js to load environmental variables into the project. |
    | /database    | Contains mongoose.js to create a connection to MongoDB.      |
    | /middleware  | Contains passport.js to provide strategies for login and JWT verification. |
    | /models      | Contains models used to store in database.                   |
    | /routes      | Contains index.js with two folders containing more routes. Main routes require authentication while the user routes does not need it. |
    | /validations | Used for validations on requests. Only currently used for registration. |

    

### Testing

Using [Mocha](https://mochajs.org/) along with [Expect](https://jestjs.io/docs/en/expect) and [supertest](https://www.npmjs.com/package/supertest) to test all API points.

```bash
npm test
```

When running the command the environmental variable gets set to **test** on the *package.json*. Both Windows and  Linux is supported.

## Release History

* 0.0.1 - January 2019
    - Basic Authentication implemented using Passport.js.
    - Reorganized routes
    - General Cleaning up files
* 0.0.0 - October 2018
    * Inception 

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - Used for frontend/backend development

* [Postman](https://www.getpostman.com/) - Testing APIs v6.7.3

* [Node.js](https://nodejs.org/en/) - Backend v11.2.0

* [Express.js](https://expressjs.com/) - Web Framework v4.16.4

* [MongoDB](https://www.mongodb.com/) - Document Based Database v4.06

  

## Contributing

1. Not accepting anyone at the moment

## Authors
* **Roberto Sanchez** - *Initial work* - [Zyxel-1](https://github.com/Zyxel-1)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php)

## Acknowledgments
* None at the moment
